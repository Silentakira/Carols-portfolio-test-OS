'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show for 2 seconds, then fade out
    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // Complete after fade out animation
    const timer2 = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] bg-gradient-to-br from-coquette-white via-coquette-pink-light to-coquette-pink flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className="text-center"
          >
            {/* Large Bow */}
            <motion.div
              animate={{
                rotate: [0, 5, -5, 5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="mb-6"
            >
              <div className="relative">
                {/* Left bow loop */}
                <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-gradient-to-br from-coquette-pink-dark to-coquette-pink shadow-coquette-lg" />

                {/* Right bow loop */}
                <div className="absolute right-0 top-0 w-16 h-16 rounded-full bg-gradient-to-bl from-coquette-pink-dark to-coquette-pink shadow-coquette-lg" />

                {/* Center knot */}
                <div className="relative w-8 h-8 mx-auto rounded-full bg-gradient-to-br from-coquette-rose to-coquette-pink-dark shadow-coquette-md z-10" />

                {/* Bow tails */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
                  <div className="w-3 h-12 rounded-full bg-gradient-to-b from-coquette-pink to-coquette-pink-dark shadow-coquette-sm transform -rotate-12" />
                  <div className="w-3 h-12 rounded-full bg-gradient-to-b from-coquette-pink to-coquette-pink-dark shadow-coquette-sm transform rotate-12" />
                </div>
              </div>
            </motion.div>

            {/* Decorative smaller bows */}
            <div className="flex justify-center gap-4 mb-6">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="relative"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coquette-pink to-coquette-pink-dark shadow-coquette-sm" />
                  <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-gradient-to-bl from-coquette-pink to-coquette-pink-dark shadow-coquette-sm" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-coquette-rose" />
                </motion.div>
              ))}
            </div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-semibold text-coquette-rose"
            >
              Portfolio
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-sm text-coquette-rose/70 mt-2"
            >
              Loading your experience...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
