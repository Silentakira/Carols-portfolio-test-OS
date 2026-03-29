'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
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

  const dragConstraintsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Use motion values for smooth dragging
  const x = useMotionValue(position.x);
  const y = useMotionValue(position.y);

  const handleDragStart = () => {
    setIsDragging(true);
    onFocus();
  };

  const handleDragEnd = (_: any, info: any) => {
    if (isMaximized) return;

    setIsDragging(false);

    // Calculate final position based on offset
    const newX = Math.round(position.x + info.offset.x);
    const newY = Math.round(position.y + info.offset.y);

    // Constrain to screen bounds
    const constrainedX = Math.max(0, Math.min(newX, window.innerWidth - size.width));
    const constrainedY = Math.max(28, Math.min(newY, window.innerHeight - size.height));

    // Update the motion values to the constrained position
    x.set(constrainedX);
    y.set(constrainedY);

    // Update the state
    onPositionChange?.(id, { x: constrainedX, y: constrainedY });
  };

  if (!isOpen || isMinimized) return null;

  return (
    <>
      {/* Invisible boundary for drag constraints */}
      <div
        ref={dragConstraintsRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: zIndex - 1 }}
      />

      <motion.div
        key={`${id}-${position.x}-${position.y}`}
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
        dragElastic={false}
        dragConstraints={dragConstraintsRef}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onMouseDown={onFocus}
        onTouchStart={onFocus}
        className={`
          fixed rounded-2xl glass-effect shadow-coquette-lg overflow-hidden
          ${isMaximized ? 'rounded-none cursor-default' : 'cursor-move'}
        `}
      >
        {/* Title Bar */}
        <div
          className="h-10 bg-gradient-to-r from-coquette-pink to-coquette-pink-light border-b border-white/50 flex items-center justify-between px-4 select-none"
          onDoubleClick={onMaximize}
        >
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
        <div className="h-[calc(100%-2.5rem)] overflow-auto bg-coquette-white/50 cursor-auto">
          {children}
        </div>
      </motion.div>
    </>
  );
}
