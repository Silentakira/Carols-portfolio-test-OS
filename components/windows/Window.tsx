'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, PanInfo } from 'framer-motion';
import WindowControls from './WindowControls';
import type { WindowState } from '@/types/window';

interface WindowProps {
  windowState: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onPositionChange?: (id: string, position: { x: number; y: number }) => void;
  children: React.ReactNode;
}

export default function Window({
  windowState,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  children,
}: WindowProps) {
  const { id, isOpen, isMinimized, isMaximized, position, size, zIndex, title } = windowState;

  const windowRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(position.x);
  const y = useMotionValue(position.y);

  // Sync motion values with position state
  useEffect(() => {
    x.set(position.x);
    y.set(position.y);
  }, [position.x, position.y, x, y]);

  const handleDrag = (_: any, info: PanInfo) => {
    if (typeof window === 'undefined' || isMaximized) return;

    const newX = Math.max(0, Math.min(window.innerWidth - size.width, position.x + info.delta.x));
    const newY = Math.max(28, Math.min(window.innerHeight - size.height, position.y + info.delta.y));

    x.set(newX);
    y.set(newY);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (typeof window === 'undefined' || isMaximized) return;

    const newX = Math.max(0, Math.min(window.innerWidth - size.width, position.x + info.offset.x));
    const newY = Math.max(28, Math.min(window.innerHeight - size.height, position.y + info.offset.y));

    x.set(newX);
    y.set(newY);

    // Update the state with final position
    onPositionChange?.(id, { x: newX, y: newY });
  };

  if (!isOpen || isMinimized) return null;

  return (
    <motion.div
      ref={windowRef}
      style={{
        x,
        y,
        zIndex,
        width: size.width,
        height: size.height,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      drag={!isMaximized}
      dragMomentum={false}
      dragElastic={0}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
      className={`
        fixed rounded-2xl glass-effect shadow-coquette-lg overflow-hidden
        ${isMaximized ? 'rounded-none' : ''}
      `}
    >
      {/* Title Bar */}
      <div className="h-10 bg-gradient-to-r from-coquette-pink to-coquette-pink-light border-b border-white/50 flex items-center justify-between px-4 cursor-default">
        <div className="flex items-center gap-3">
          <WindowControls
            onClose={onClose}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
            isMaximized={isMaximized}
          />
          <span className="text-sm font-medium text-coquette-rose ml-2">{title}</span>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-2.5rem)] overflow-auto bg-coquette-white/50">
        {children}
      </div>
    </motion.div>
  );
}
