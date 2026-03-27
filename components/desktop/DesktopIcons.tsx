'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';
import { categories } from '@/lib/photoData';

interface DesktopIconsProps {
  onFolderClick: (categoryId: string) => void;
}

export default function DesktopIcons({ onFolderClick }: DesktopIconsProps) {
  return (
    <div className="hidden md:grid grid-cols-1 gap-6 p-4 pt-16">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          onClick={() => onFolderClick(category.id)}
          className="flex flex-col items-center gap-2 group w-24 no-select"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-coquette-pink to-coquette-pink-dark flex items-center justify-center shadow-coquette-sm border-2 border-white/50 group-hover:border-coquette-white transition-all">
              <Folder size={32} className="text-white drop-shadow-md" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-coquette-rose border-2 border-white" />
          </div>
          <span className="text-xs font-medium text-coquette-rose px-2 py-1 rounded bg-white/50 backdrop-blur-sm">
            {category.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
