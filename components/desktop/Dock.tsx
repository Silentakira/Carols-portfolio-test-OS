'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Image,
  User,
  Folder,
  Settings,
  Globe,
  type LucideIcon,
} from 'lucide-react';

interface DockItem {
  id: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
}

const dockItems: DockItem[] = [
  { id: 'photos', icon: Image, label: 'Photos', isActive: false },
  { id: 'about', icon: User, label: 'About Me', isActive: false },
  { id: 'finder', icon: Folder, label: 'Finder', isActive: false },
  { id: 'browser', icon: Globe, label: 'Browser', isActive: false },
  { id: 'settings', icon: Settings, label: 'Settings', isActive: false },
];

interface DockProps {
  onDockItemClick: (id: string, title: string) => void;
  activeWindows: string[];
}

export default function Dock({ onDockItemClick, activeWindows }: DockProps) {
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 hidden md:block">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        className="flex items-end gap-1 px-3 py-2 rounded-2xl glass-effect shadow-coquette-lg"
        whileHover={{ scale: 1.02 }}
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeWindows.includes(item.id);

          return (
            <motion.button
              key={item.id}
              onClick={() => onDockItemClick(item.id, item.label)}
              className="relative group"
              whileHover={{ y: -10, scale: 1.3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-coquette-white to-coquette-pink flex items-center justify-center shadow-coquette-sm border border-white/50">
                <Icon
                  size={24}
                  className="text-coquette-rose group-hover:text-coquette-pink-dark transition-colors"
                />
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-coquette-rose"
                />
              )}

              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-coquette-rose text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
