'use client';

import { useReducer } from 'react';
import type { WindowState, WindowAction, WindowConfig } from '@/types/window';

const getCenterPosition = (width: number, height: number): { x: number; y: number } => {
  if (typeof window === 'undefined') return { x: 100, y: 100 };
  const x = Math.max(0, (window.innerWidth - width) / 2);
  const y = Math.max(0, (window.innerHeight - height) / 2);
  return { x, y };
};

const createInitialState = (): Record<string, WindowState> => ({});

// Function to get center position dynamically
const getDynamicCenterPosition = (width: number, height: number): { x: number; y: number } => {
  if (typeof window === 'undefined') return { x: 100, y: 100 };
  const x = Math.max(0, (window.innerWidth - width) / 2);
  const y = Math.max(28, (window.innerHeight - height) / 2);
  return { x, y };
};

export const windowConfigs: Record<string, WindowConfig> = {
  photos: {
    id: 'photos',
    title: 'Photos',
    defaultSize: { width: 900, height: 600 },
    defaultPosition: { x: 0, y: 0 }, // Will be calculated dynamically
    minSize: { width: 400, height: 300 },
    resizable: true,
  },
  about: {
    id: 'about',
    title: 'About Me',
    defaultSize: { width: 600, height: 500 },
    defaultPosition: { x: 0, y: 0 }, // Will be calculated dynamically
    minSize: { width: 400, height: 300 },
    resizable: true,
  },
  finder: {
    id: 'finder',
    title: 'Finder',
    defaultSize: { width: 700, height: 500 },
    defaultPosition: { x: 0, y: 0 }, // Will be calculated dynamically
    minSize: { width: 400, height: 300 },
    resizable: true,
  },
  settings: {
    id: 'settings',
    title: 'Settings',
    defaultSize: { width: 500, height: 400 },
    defaultPosition: { x: 0, y: 0 }, // Will be calculated dynamically
    minSize: { width: 400, height: 300 },
    resizable: true,
  },
  browser: {
    id: 'browser',
    title: 'Browser',
    defaultSize: { width: 1000, height: 700 },
    defaultPosition: { x: 0, y: 0 }, // Will be calculated dynamically
    minSize: { width: 600, height: 400 },
    resizable: true,
  },
};

function windowReducer(
  state: Record<string, WindowState>,
  action: WindowAction
): Record<string, WindowState> {
  const maxZIndex = Math.max(0, ...Object.values(state).map((w) => w.zIndex));

  switch (action.type) {
    case 'OPEN_WINDOW': {
      const { id, title, initialPosition } = action.payload;
      const config = windowConfigs[id];

      if (state[id]?.isOpen) {
        // Window already open, just bring to front
        return {
          ...state,
          [id]: { ...state[id], zIndex: maxZIndex + 1, isMinimized: false },
        };
      }

      // Calculate center position dynamically
      const centerPos = getDynamicCenterPosition(
        config?.defaultSize.width || 600,
        config?.defaultSize.height || 400
      );

      return {
        ...state,
        [id]: {
          id,
          title,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          position: initialPosition || centerPos,
          size: config?.defaultSize || { width: 600, height: 400 },
          zIndex: maxZIndex + 1,
        },
      };
    }

    case 'CLOSE_WINDOW': {
      const { id } = action.payload;
      return {
        ...state,
        [id]: { ...state[id], isOpen: false, isMinimized: false },
      };
    }

    case 'MINIMIZE_WINDOW': {
      const { id } = action.payload;
      return {
        ...state,
        [id]: { ...state[id], isMinimized: true },
      };
    }

    case 'MAXIMIZE_WINDOW': {
      const { id } = action.payload;
      if (typeof window === 'undefined') return state;

      return {
        ...state,
        [id]: {
          ...state[id],
          isMaximized: true,
          position: { x: 0, y: 0 },
          size: { width: window.innerWidth, height: window.innerHeight },
        },
      };
    }

    case 'RESTORE_WINDOW': {
      const { id } = action.payload;
      const config = windowConfigs[id];

      if (!state[id].isMaximized) {
        // If not maximized, just unminimize
        return {
          ...state,
          [id]: { ...state[id], isMinimized: false, zIndex: maxZIndex + 1 },
        };
      }

      // Restore from maximized - recalculate center position
      const centerPos = getDynamicCenterPosition(
        config?.defaultSize.width || 600,
        config?.defaultSize.height || 400
      );

      return {
        ...state,
        [id]: {
          ...state[id],
          isMaximized: false,
          isMinimized: false,
          position: centerPos,
          size: config?.defaultSize || { width: 600, height: 400 },
          zIndex: maxZIndex + 1,
        },
      };
    }

    case 'BRING_TO_FRONT': {
      const { id } = action.payload;
      return {
        ...state,
        [id]: { ...state[id], zIndex: maxZIndex + 1 },
      };
    }

    case 'UPDATE_POSITION': {
      const { id, position } = action.payload;
      return {
        ...state,
        [id]: { ...state[id], position },
      };
    }

    case 'UPDATE_SIZE': {
      const { id, size } = action.payload;
      return {
        ...state,
        [id]: { ...state[id], size },
      };
    }

    default:
      return state;
  }
}

export function useWindowManager() {
  const [windows, dispatch] = useReducer(windowReducer, createInitialState());

  const openWindow = (id: string, title: string, initialPosition?: { x: number; y: number }) => {
    dispatch({ type: 'OPEN_WINDOW', payload: { id, title, initialPosition } });
  };

  const closeWindow = (id: string) => {
    dispatch({ type: 'CLOSE_WINDOW', payload: { id } });
  };

  const minimizeWindow = (id: string) => {
    dispatch({ type: 'MINIMIZE_WINDOW', payload: { id } });
  };

  const maximizeWindow = (id: string) => {
    dispatch({ type: 'MAXIMIZE_WINDOW', payload: { id } });
  };

  const restoreWindow = (id: string) => {
    dispatch({ type: 'RESTORE_WINDOW', payload: { id } });
  };

  const bringToFront = (id: string) => {
    dispatch({ type: 'BRING_TO_FRONT', payload: { id } });
  };

  const updatePosition = (id: string, position: { x: number; y: number }) => {
    dispatch({ type: 'UPDATE_POSITION', payload: { id, position } });
  };

  const updateSize = (id: string, size: { width: number; height: number }) => {
    dispatch({ type: 'UPDATE_SIZE', payload: { id, size } });
  };

  const getOpenWindows = () => {
    return Object.values(windows).filter((w) => w.isOpen && !w.isMinimized);
  };

  const getMinimizedWindows = () => {
    return Object.values(windows).filter((w) => w.isOpen && w.isMinimized);
  };

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    bringToFront,
    updatePosition,
    updateSize,
    getOpenWindows,
    getMinimizedWindows,
  };
}
