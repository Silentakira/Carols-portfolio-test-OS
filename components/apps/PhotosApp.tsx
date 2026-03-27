'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, getPhotosByCategory, type Photo } from '@/lib/photoData';

interface PhotosAppProps {
  initialCategory?: string;
}

export default function PhotosApp({ initialCategory = 'all' }: PhotosAppProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const photos = getPhotosByCategory(selectedCategory);

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-48 bg-coquette-pink/30 border-r border-coquette-pink/50 p-4">
        <h2 className="text-lg font-semibold text-coquette-rose mb-4">Categories</h2>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedCategory === 'all'
                ? 'bg-coquette-pink text-white'
                : 'hover:bg-coquette-pink/50 text-coquette-rose'
            }`}
          >
            All Photos
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === category.id
                  ? 'bg-coquette-pink text-white'
                  : 'hover:bg-coquette-pink/50 text-coquette-rose'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {photos.map((photo) => (
              <motion.button
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative aspect-square rounded-xl overflow-hidden shadow-coquette-sm bg-coquette-pink/20"
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-sm font-medium">{photo.title}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[80vh] aspect-auto rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                width={800}
                height={600}
                className="object-contain w-full h-full"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold">{selectedPhoto.title}</h3>
                {selectedPhoto.description && (
                  <p className="text-white/80 mt-1">{selectedPhoto.description}</p>
                )}
                {selectedPhoto.date && (
                  <p className="text-white/60 text-sm mt-2">{selectedPhoto.date}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
