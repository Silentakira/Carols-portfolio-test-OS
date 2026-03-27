'use client';

import React, { useState, useEffect } from 'react';
import { Apple } from 'lucide-react';

export default function MenuBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-7 glass-effect z-50 flex items-center justify-between px-4 text-sm">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button className="text-coquette-rose hover:text-coquette-pink-dark transition-colors">
          <Apple size={14} />
        </button>
        <span className="font-medium text-coquette-rose">Portfolio</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 text-xs">
        <span className="hidden md:inline">{formatDate(time)}</span>
        <span>{formatTime(time)}</span>
      </div>
    </header>
  );
}
