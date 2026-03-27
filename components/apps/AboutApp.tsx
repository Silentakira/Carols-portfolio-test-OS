'use client';

import React from 'react';
import { Mail, Instagram, Github, Linkedin } from 'lucide-react';

export default function AboutApp() {
  return (
    <div className="h-full p-8 overflow-auto">
      <div className="max-w-2xl mx-auto">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-coquette-pink to-coquette-pink-dark flex items-center justify-center shadow-coquette-lg">
            <span className="text-6xl">📸</span>
          </div>
          <h1 className="text-3xl font-bold text-coquette-rose mb-2">Your Name</h1>
          <p className="text-coquette-rose/70">Photographer & Visual Artist</p>
        </div>

        {/* Bio Section */}
        <div className="bg-white/50 rounded-xl p-6 mb-6 shadow-coquette-sm">
          <h2 className="text-xl font-semibold text-coquette-rose mb-3">About Me</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to my portfolio! I&apos;m a passionate photographer who loves capturing
            beautiful moments and creating visual stories. My work spans across various
            genres including portraits, nature, street photography, and more.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            Each photograph tells a unique story, and I invite you to explore my
            collections. Feel free to reach out if you&apos;d like to work together or
            just chat about photography!
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-white/50 rounded-xl p-6 shadow-coquette-sm">
          <h2 className="text-xl font-semibold text-coquette-rose mb-4">Get in Touch</h2>
          <div className="space-y-3">
            <a
              href="mailto:your.email@example.com"
              className="flex items-center gap-3 p-3 rounded-lg bg-coquette-pink/20 hover:bg-coquette-pink/40 transition-colors"
            >
              <Mail className="text-coquette-rose" size={20} />
              <span className="text-gray-700">your.email@example.com</span>
            </a>
            <a
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-coquette-pink/20 hover:bg-coquette-pink/40 transition-colors"
            >
              <Instagram className="text-coquette-rose" size={20} />
              <span className="text-gray-700">@yourusername</span>
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-coquette-pink/20 hover:bg-coquette-pink/40 transition-colors"
            >
              <Github className="text-coquette-rose" size={20} />
              <span className="text-gray-700">github.com/yourusername</span>
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-coquette-pink/20 hover:bg-coquette-pink/40 transition-colors"
            >
              <Linkedin className="text-coquette-rose" size={20} />
              <span className="text-gray-700">linkedin.com/in/yourusername</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
