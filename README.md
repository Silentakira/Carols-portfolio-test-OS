# Portfolio OS

A creative photography portfolio built as a fake macOS-inspired operating system with a coquette aesthetic (pastel pink/white theme).

![Portfolio OS](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwind-css)

## Features

- **macOS-Inspired Interface**
  - Menu bar with live clock
  - Dock with hover magnification effects
  - Draggable, resizable windows
  - Desktop folder icons

- **Portfolio Features**
  - Photo gallery with category filtering
  - Lightbox view for full-screen photos
  - About Me app with bio and contact info
  - Finder-style folder navigation

- **Coquette Aesthetic**
  - Soft pastel pink and white color palette
  - Glass morphism effects
  - Smooth animations
  - Rounded corners and soft shadows

- **Responsive Design**
  - Optimized for desktop (full OS experience)
  - Mobile-friendly with simplified interface
  - Touch-friendly interactions

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build

```bash
npm run build
npm start
```

## Customization

### Add Your Own Photos

Edit `lib/photoData.ts` to replace the sample photos with your own:

```typescript
export const samplePhotos: Photo[] = [
  {
    id: '1',
    src: '/your-photo-1.jpg',  // Add to public/ folder
    title: 'Your Photo Title',
    category: 'portraits',
    date: '2024-01-15',
    description: 'Photo description',
  },
  // Add more photos...
];
```

### Personalize About Me

Edit `components/apps/AboutApp.tsx` to update:
- Your name and title
- Bio text
- Contact information
- Social media links

### Customize Categories

Edit `lib/photoData.ts` to add/remove photo categories:

```typescript
export const categories: Category[] = [
  { id: 'portraits', name: 'Portraits', icon: 'User' },
  { id: 'nature', name: 'Nature', icon: 'Leaf' },
  // Add your categories...
];
```

### Adjust Colors

Modify the coquette color palette in `tailwind.config.ts`:

```typescript
colors: {
  coquette: {
    pink: '#FFD6E0',
    pinkDark: '#FFB3C1',
    // ... adjust as needed
  }
}
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main desktop page
│   └── globals.css        # Global styles
├── components/
│   ├── desktop/           # Desktop components
│   │   ├── Background.tsx
│   │   ├── MenuBar.tsx
│   │   ├── Dock.tsx
│   │   └── DesktopIcons.tsx
│   ├── windows/           # Window system
│   │   ├── Window.tsx
│   │   └── WindowControls.tsx
│   └── apps/              # Portfolio apps
│       ├── PhotosApp.tsx
│       ├── AboutApp.tsx
│       └── FolderView.tsx
├── lib/
│   ├── photoData.ts       # Photo data & categories
│   └── windowManager.ts   # Window state management
└── types/
    └── window.ts          # TypeScript types
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Future Enhancements

- [ ] Add more apps (Contact Form, Blog, etc.)
- [ ] Keyboard shortcuts
- [ ] Window snapping to edges
- [ ] Dark mode toggle
- [ ] Sound effects
- [ ] More realistic macOS features

## License

MIT

## Credits

Built with ❤️ using Next.js and Framer Motion
# Carols-portfolio-test-OS
