'use client';

import React, { useState } from 'react';
import { Palette, Sun, Moon, type LucideIcon } from 'lucide-react';

type ColorTheme = 'coquette' | 'pastel-blue' | 'pastel-green' | 'pastel-purple';
type ThemeMode = 'light' | 'dark';

interface ThemeOption {
  id: ColorTheme;
  name: string;
  icon: LucideIcon;
  previewColors: string[];
}

const themeOptions: ThemeOption[] = [
  {
    id: 'coquette',
    name: 'Coquette Pink',
    icon: Palette,
    previewColors: ['#FFD6E0', '#FFB3C1', '#E8B4B8'],
  },
  {
    id: 'pastel-blue',
    name: 'Pastel Blue',
    icon: Palette,
    previewColors: ['#D6E5FF', '#B3D1FF', '#B8D4E8'],
  },
  {
    id: 'pastel-green',
    name: 'Pastel Green',
    icon: Palette,
    previewColors: ['#D6FFE5', '#B3FFD1', '#B8E8D0'],
  },
  {
    id: 'pastel-purple',
    name: 'Pastel Purple',
    icon: Palette,
    previewColors: ['#E5D6FF', '#D1B3FF', '#D8B8E8'],
  },
];

export default function SettingsApp() {
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>('coquette');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const applyTheme = (theme: ColorTheme) => {
    setSelectedTheme(theme);
    // This would update CSS variables or Tailwind classes
    // For now, it's a visual selection
    console.log('Applying theme:', theme);
  };

  return (
    <div className="h-full p-8 overflow-auto">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-coquette-rose mb-6">Settings</h1>

        {/* Appearance Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-coquette-rose mb-4 flex items-center gap-2">
            <Palette size={20} />
            Appearance
          </h2>

          <div className="bg-white/50 rounded-xl p-6 shadow-coquette-sm">
            <h3 className="font-medium text-gray-700 mb-4">Color Theme</h3>

            <div className="grid grid-cols-2 gap-4">
              {themeOptions.map((theme) => {
                const Icon = theme.icon;
                return (
                  <button
                    key={theme.id}
                    onClick={() => applyTheme(theme.id)}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all
                      ${
                        selectedTheme === theme.id
                          ? 'border-coquette-rose bg-coquette-pink/20'
                          : 'border-transparent bg-white/50 hover:bg-coquette-pink/10'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Icon
                        size={24}
                        className={`${
                          selectedTheme === theme.id
                            ? 'text-coquette-rose'
                            : 'text-gray-400'
                        }`}
                      />
                      <span className="font-medium text-gray-700">{theme.name}</span>
                    </div>

                    {/* Color preview */}
                    <div className="flex gap-2">
                      {theme.previewColors.map((color) => (
                        <div
                          key={color}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    {/* Selected indicator */}
                    {selectedTheme === theme.id && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-coquette-rose border-2 border-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mode Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-coquette-rose mb-4">Display Mode</h2>

          <div className="bg-white/50 rounded-xl p-6 shadow-coquette-sm">
            <div className="flex gap-4">
              <button
                onClick={() => setThemeMode('light')}
                className={`
                  flex-1 p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2
                  ${
                    themeMode === 'light'
                      ? 'border-coquette-rose bg-coquette-pink/20 text-coquette-rose'
                      : 'border-transparent bg-white/50 text-gray-600 hover:bg-coquette-pink/10'
                  }
                `}
              >
                <Sun size={20} />
                <span className="font-medium">Light</span>
              </button>

              <button
                onClick={() => setThemeMode('dark')}
                className={`
                  flex-1 p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2
                  ${
                    themeMode === 'dark'
                      ? 'border-coquette-rose bg-coquette-pink/20 text-coquette-rose'
                      : 'border-transparent bg-white/50 text-gray-600 hover:bg-coquette-pink/10'
                  }
                `}
              >
                <Moon size={20} />
                <span className="font-medium">Dark</span>
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white/50 rounded-xl p-6 shadow-coquette-sm">
          <h3 className="font-medium text-gray-700 mb-2">About</h3>
          <p className="text-sm text-gray-500">
            Portfolio OS v1.0.0 - A macOS-inspired portfolio with a coquette aesthetic.
            <br />
            Customize your experience with different color themes.
          </p>
        </div>
      </div>
    </div>
  );
}
