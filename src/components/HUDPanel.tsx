import React from 'react';
import { cn } from '../lib/utils';

interface HUDPanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  accent?: 'orange' | 'blue';
}

export const HUDPanel: React.FC<HUDPanelProps> = ({ 
  children, 
  className, 
  title, 
  icon,
  accent = 'blue' 
}) => {
  return (
    <div className={cn(
      "hud-panel p-4 group",
      accent === 'orange' ? "border-truth-orange/20" : "border-truth-blue/20",
      className
    )}>
      {/* Corner Accents */}
      <div className={cn(
        "absolute top-0 left-0 w-2 h-2 border-t border-l",
        accent === 'orange' ? "border-truth-orange/60" : "border-truth-blue/60"
      )} />
      <div className={cn(
        "absolute top-0 right-0 w-2 h-2 border-t border-r",
        accent === 'orange' ? "border-truth-orange/60" : "border-truth-blue/60"
      )} />
      <div className={cn(
        "absolute bottom-0 left-0 w-2 h-2 border-b border-l",
        accent === 'orange' ? "border-truth-orange/60" : "border-truth-blue/60"
      )} />
      <div className={cn(
        "absolute bottom-0 right-0 w-2 h-2 border-b border-r",
        accent === 'orange' ? "border-truth-orange/60" : "border-truth-blue/60"
      )} />

      {title && (
        <div className="flex items-center gap-2 mb-4">
          {icon && (
            <div className={accent === 'orange' ? "text-truth-orange" : "text-truth-blue"}>
              {icon}
            </div>
          )}
          <h2 className={cn(
            "font-mono text-xs font-bold tracking-[0.15em] uppercase",
            accent === 'orange' ? "hud-glow-orange text-truth-orange" : "hud-glow-blue text-truth-blue"
          )}>
            {title}
          </h2>
        </div>
      )}

      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};
