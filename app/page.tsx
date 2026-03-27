'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Background from '@/components/desktop/Background';
import MenuBar from '@/components/desktop/MenuBar';
import Dock from '@/components/desktop/Dock';
import DesktopIcons from '@/components/desktop/DesktopIcons';
import Window from '@/components/windows/Window';
import BootScreen from '@/components/desktop/BootScreen';
import PhotosApp from '@/components/apps/PhotosApp';
import AboutApp from '@/components/apps/AboutApp';
import FolderView from '@/components/apps/FolderView';
import { useWindowManager } from '@/lib/windowManager';

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);

  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    bringToFront,
  } = useWindowManager();

  const handleDockItemClick = (id: string, title: string) => {
    if (windows[id]?.isOpen) {
      if (windows[id].isMinimized) {
        restoreWindow(id);
      } else {
        bringToFront(id);
      }
    } else {
      openWindow(id, title);
    }
  };

  const handleFolderClick = (categoryId: string) => {
    openWindow('finder', `Finder - ${categoryId}`);
  };

  const activeWindows = Object.keys(windows).filter(
    (id) => windows[id].isOpen && !windows[id].isMinimized
  );

  return (
    <main className="h-screen w-screen overflow-hidden">
      <BootScreen onComplete={() => setBootComplete(true)} />

      {bootComplete && (
        <>
          <Background />
          <MenuBar />

      {/* Desktop Icons */}
      <DesktopIcons onFolderClick={handleFolderClick} />

      {/* Windows */}
      <AnimatePresence>
        {Object.values(windows)
          .filter((w) => w.isOpen && !w.isMinimized)
          .sort((a, b) => a.zIndex - b.zIndex)
          .map((windowState) => (
            <Window
              key={windowState.id}
              windowState={windowState}
              onClose={() => closeWindow(windowState.id)}
              onMinimize={() => minimizeWindow(windowState.id)}
              onMaximize={() => maximizeWindow(windowState.id)}
              onFocus={() => bringToFront(windowState.id)}
            >
              {windowState.id === 'photos' && <PhotosApp />}
              {windowState.id === 'about' && <AboutApp />}
              {windowState.id === 'finder' && <FolderView categoryId="all" />}
              {windowState.id === 'settings' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-coquette-rose mb-4">Settings</h2>
                  <p className="text-gray-600">Settings panel coming soon...</p>
                </div>
              )}
            </Window>
          ))}
      </AnimatePresence>

      {/* Dock */}
      <Dock onDockItemClick={handleDockItemClick} activeWindows={activeWindows} />

          {/* Mobile Notice */}
          <div className="md:hidden fixed bottom-20 left-4 right-4 p-4 rounded-xl bg-coquette-pink/90 backdrop-blur-sm shadow-coquette-lg">
            <p className="text-sm text-white text-center">
              For the best experience, view on a larger screen
            </p>
          </div>
        </>
      )}
    </main>
  );
}
