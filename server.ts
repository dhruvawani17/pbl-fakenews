import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { YoutubeTranscript } from 'youtube-transcript';
import { search, SafeSearchType } from 'duck-duck-scrape';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getVideoId(url: string) {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.toLowerCase();

    if (host.includes('youtu.be')) {
      return parsedUrl.pathname.slice(1).split('/')[0];
    }

    if (host.includes('youtube.com')) {
      if (parsedUrl.pathname === '/watch') {
        return parsedUrl.searchParams.get('v');
      }
      if (parsedUrl.pathname.startsWith('/shorts/')) {
        return parsedUrl.pathname.split('/shorts/')[1].split('/')[0];
      }
      if (parsedUrl.pathname.startsWith('/embed/')) {
        return parsedUrl.pathname.split('/embed/')[1].split('/')[0];
      }
      if (parsedUrl.pathname.startsWith('/v/')) {
        return parsedUrl.pathname.split('/v/')[1].split('/')[0];
      }
    }
    return null;
  } catch (e) {
    return null;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Context Gathering Endpoint
  app.post('/api/context', async (req, res) => {
    try {
      const { content, youtubeUrl } = req.body;
      let analysisText = content || '';

      // 1. YouTube Extraction
      if (youtubeUrl) {
        const videoId = getVideoId(youtubeUrl);
        if (!videoId) {
          return res.status(400).json({ error: 'Invalid YouTube URL. Please check the link and try again.' });
        }

        try {
          // Use the extracted videoId directly if possible, or the full URL
          const transcriptData = await YoutubeTranscript.fetchTranscript(videoId);
          analysisText = transcriptData.map(t => t.text).join(' ');
        } catch (e: any) {
             console.error('YouTube Transcript Error:', e);
             const subError = e?.message || '';
             let msg = 'Could not extract YouTube transcript. This usually happens if the video is private or lacks automated captions.';
             if (subError.includes('Impossible to retrieve Youtube video ID')) {
               msg = 'Verify system failed to identify the video ID. Try a direct watch link.';
             }
             return res.status(400).json({ error: msg });
        }
      }

      if (!analysisText || analysisText.trim().length < 5) {
        return res.status(400).json({ error: 'The provided content is too short for a meaningful veracity scan.' });
      }

      // 2. Web Search for Context
      // Extract key entities and verbs to avoid triggering rate limits with complex sentences
      const words = analysisText.split(/\s+/).filter(w => w.length > 3);
      const searchPrompt = words.slice(0, 10).join(' ').replace(/[^\w\s]/gi, '').trim();
        
      let sources: any[] = [];
      let searchContext = '';

      try {
        if (searchPrompt.length > 5) {
          // Add a jittered delay to further prevent rate limiting
          await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
          
          const searchResults = await search(searchPrompt, { safeSearch: SafeSearchType.STRICT });
          if (searchResults && searchResults.results && searchResults.results.length > 0) {
            sources = searchResults.results.slice(0, 5).map(r => ({
              title: r.title,
              url: r.url,
              snippet: r.description
            }));
            searchContext = sources.map((s, i) => `Source ${i+1}: ${s.title}\nLink: ${s.url}\nSummary: ${s.snippet}`).join('\n\n');
          }
        }
      } catch (e: any) {
        console.warn('Search Throttled:', e.message);
        searchContext = 'Search context unavailable due to rate limits. Verify using internal tools.';
      }

      res.json({
        analysisText: analysisText.substring(0, 8000),
        sources,
        searchContext
      });

    } catch (error: any) {
      console.error('Context API error:', error);
      res.status(500).json({ error: 'Deep intelligence verification failure. Please try again in a few moments.' });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Veritas AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
