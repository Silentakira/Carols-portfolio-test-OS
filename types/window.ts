export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export type WindowAction =
  | { type: 'OPEN_WINDOW'; payload: { id: string; title: string; initialPosition?: { x: number; y: number } } }
  | { type: 'CLOSE_WINDOW'; payload: { id: string } }
  | { type: 'MINIMIZE_WINDOW'; payload: { id: string } }
  | { type: 'MAXIMIZE_WINDOW'; payload: { id: string } }
  | { type: 'RESTORE_WINDOW'; payload: { id: string } }
  | { type: 'BRING_TO_FRONT'; payload: { id: string } }
  | { type: 'UPDATE_POSITION'; payload: { id: string; position: { x: number; y: number } } }
  | { type: 'UPDATE_SIZE'; payload: { id: string; size: { width: number; height: number } } };

export interface WindowConfig {
  id: string;
  title: string;
  defaultSize: { width: number; height: number };
  defaultPosition: { x: number; y: number };
  minSize: { width: number; height: number };
  resizable?: boolean;
}

export type AppId = 'photos' | 'about' | 'finder' | 'settings';
