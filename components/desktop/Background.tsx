'use client';

import React from 'react';

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-coquette-white via-coquette-pink-light to-coquette-pink" />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #E8B4B8 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Optional: Add a vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-coquette-pink/20 to-transparent" />
    </div>
  );
}
