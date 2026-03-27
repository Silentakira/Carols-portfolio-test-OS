'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Folder, Image } from 'lucide-react';
import { categories, getPhotosByCategory } from '@/lib/photoData';

interface FolderViewProps {
  categoryId: string;
  onPhotoClick?: (photoId: string) => void;
}

export default function FolderView({ categoryId, onPhotoClick }: FolderViewProps) {
  const category = categories.find((c) => c.id === categoryId);
  const photos = getPhotosByCategory(categoryId);

  if (!category) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-coquette-rose/70">Category not found</p>
      </div>
    );
  }

  return (
    <div className="h-full p-6 overflow-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-coquette-rose flex items-center gap-3">
          <Folder size={28} />
          {category.name}
        </h1>
        {category.description && (
          <p className="text-gray-600 mt-2 ml-11">{category.description}</p>
        )}
        <p className="text-sm text-gray-500 mt-1 ml-11">{photos.length} items</p>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <motion.button
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onPhotoClick?.(photo.id)}
            className="relative aspect-square rounded-xl overflow-hidden shadow-coquette-sm bg-coquette-pink/20 group"
          >
            {/* Photo placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-coquette-pink/30 to-coquette-pink-dark/30 flex items-center justify-center">
              <Image className="text-coquette-rose/50" size={32} aria-hidden="true" />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-sm font-medium px-3 py-1 rounded-lg bg-black/50">
                {photo.title}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {photos.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <Image size={48} className="mb-3 opacity-50" aria-hidden="true" />
          <p>No photos in this folder yet</p>
        </div>
      )}
    </div>
  );
}
