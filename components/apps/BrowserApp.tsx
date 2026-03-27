'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RefreshCw, Home } from 'lucide-react';

export default function BrowserApp() {
  const [currentUrl, setCurrentUrl] = useState('chrome://dino');
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const handleNavigation = (direction: 'back' | 'forward') => {
    // Placeholder for navigation
    console.log(`${direction} navigation`);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Browser Toolbar */}
      <div className="bg-coquette-pink/30 border-b border-coquette-pink/50 p-2 flex items-center gap-2">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleNavigation('back')}
            className="p-2 rounded-lg hover:bg-coquette-pink/40 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft size={16} className="text-coquette-rose" />
          </button>
          <button
            onClick={() => handleNavigation('forward')}
            className="p-2 rounded-lg hover:bg-coquette-pink/40 transition-colors"
            aria-label="Forward"
          >
            <ArrowRight size={16} className="text-coquette-rose" />
          </button>
          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg hover:bg-coquette-pink/40 transition-colors"
            aria-label="Refresh"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin text-coquette-rose' : 'text-coquette-rose'} />
          </button>
          <button
            onClick={() => setCurrentUrl('chrome://dino')}
            className="p-2 rounded-lg hover:bg-coquette-pink/40 transition-colors"
            aria-label="Home"
          >
            <Home size={16} className="text-coquette-rose" />
          </button>
        </div>

        {/* URL Bar */}
        <div className="flex-1 flex items-center bg-white/50 rounded-full px-4 py-2 border border-coquette-pink/30">
          <div className="flex items-center gap-2 text-sm text-gray-600 flex-1">
            <span className="text-green-500">🔒</span>
            <span className="flex-1 text-center">{currentUrl}</span>
          </div>
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 relative bg-white">
        {currentUrl === 'chrome://dino' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
            {/* Dino Game Container */}
            <div className="w-full max-w-4xl p-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-gray-800 mb-2">
                    🦖 Dino Runner
                  </h2>
                  <p className="text-gray-500">
                    Press <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Space</kbd> or <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">↑</kbd> to jump
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    (Game coming soon - this is a preview)
                  </p>
                </div>

                {/* Simple Canvas for the game */}
                <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden border border-gray-300">
                  {/* Ground */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-400" />

                  {/* Dino placeholder */}
                  <div className="absolute bottom-1 left-10 text-6xl animate-bounce">
                    🦖
                  </div>

                  {/* Cactus placeholder */}
                  <div className="absolute bottom-1 right-20 text-5xl">
                    🌵
                  </div>

                  {/* Clouds */}
                  <div className="absolute top-8 left-20 text-3xl opacity-50">
                    ☁️
                  </div>
                  <div className="absolute top-12 right-32 text-2xl opacity-40">
                    ☁️
                  </div>

                  {/* Instructions overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                    <p className="text-gray-500 bg-white/80 px-4 py-2 rounded-lg">
                      Press Space or Tap to Start
                    </p>
                  </div>
                </div>

                {/* Score placeholder */}
                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-sm">High Score: 0000</p>
                </div>
              </div>

              {/* Keyboard hint */}
              <div className="mt-6 text-center text-sm text-gray-400">
                <p>🎮 Use keyboard or tap to play</p>
                <p className="mt-1">A fun browser game while you wait for your photos to load!</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-coquette-pink/20 border-t border-coquette-pink/30 px-4 py-1 text-xs text-gray-500 flex justify-between">
        <span>Ready</span>
        <span>🔒 Connection is secure</span>
      </div>
    </div>
  );
}
