export interface Photo {
  id: string;
  src: string;
  title: string;
  category: string;
  date?: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export const categories: Category[] = [
  { id: 'portraits', name: 'Portraits', icon: 'User', description: 'Portrait photography' },
  { id: 'nature', name: 'Nature', icon: 'Leaf', description: 'Nature & landscapes' },
  { id: 'events', name: 'Events', icon: 'Calendar', description: 'Events & occasions' },
  { id: 'street', name: 'Street', icon: 'MapPin', description: 'Street photography' },
  { id: 'abstract', name: 'Abstract', icon: 'Sparkles', description: 'Abstract compositions' },
];

// Sample placeholder photos - replace with real photo URLs
export const samplePhotos: Photo[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800',
    title: 'Golden Hour',
    category: 'portraits',
    date: '2024-01-15',
    description: 'A beautiful portrait during golden hour',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    title: 'Mountain View',
    category: 'nature',
    date: '2024-02-10',
    description: 'Stunning mountain landscape',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800',
    title: 'City Lights',
    category: 'street',
    date: '2024-01-20',
    description: 'Urban night photography',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
    title: 'Summer Vibes',
    category: 'portraits',
    date: '2024-03-05',
    description: 'Summer portrait session',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    title: 'Alpine Lake',
    category: 'nature',
    date: '2024-02-15',
    description: 'Peaceful alpine reflection',
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800',
    title: 'Urban Explorer',
    category: 'street',
    date: '2024-01-25',
    description: 'City exploration',
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800',
    title: 'Dreamy',
    category: 'portraits',
    date: '2024-03-10',
    description: 'Soft and ethereal',
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
    title: 'Misty Morning',
    category: 'nature',
    date: '2024-02-20',
    description: 'Early morning fog',
  },
];

export const getPhotosByCategory = (categoryId: string): Photo[] => {
  if (categoryId === 'all') return samplePhotos;
  return samplePhotos.filter((photo) => photo.category === categoryId);
};

export const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find((cat) => cat.id === categoryId);
};
