'use client';

import React from 'react';
import { X, Minus, Square } from 'lucide-react';

interface WindowControlsProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
}

export default function WindowControls({
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
}: WindowControlsProps) {
  const buttons = [
    {
      icon: Minus,
      onClick: onMinimize,
      className: 'hover:bg-yellow-400/80',
      label: 'Minimize',
    },
    {
      icon: isMaximized ? () => <Square size={12} /> : Square,
      onClick: onMaximize,
      className: 'hover:bg-green-400/80',
      label: isMaximized ? 'Restore' : 'Maximize',
    },
    {
      icon: X,
      onClick: onClose,
      className: 'hover:bg-red-400/80',
      label: 'Close',
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {buttons.map((button) => {
        const Icon = button.icon;
        return (
          <button
            key={button.label}
            onClick={button.onClick}
            className={`w-3 h-3 rounded-full bg-coquette-pink-dark flex items-center justify-center transition-colors ${button.className}`}
            aria-label={button.label}
          >
            <Icon size={10} className="text-white/70 hover:text-white" />
          </button>
        );
      })}
    </div>
  );
}
