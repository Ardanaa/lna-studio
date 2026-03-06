// Single source of truth for all project data
// Used by: Projects.jsx, AllArchive.jsx, ProjectDetail.jsx

export const featuredProjects = [
  {
    id: '001',
    title: 'NOCTURNAL',
    category: 'Commercial',
    genre: 'Porsche',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2666&auto=format&fit=crop',
  },
  {
    id: '002',
    title: 'SILHOUETTES',
    category: 'Editorial',
    genre: 'Vogue',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2788&auto=format&fit=crop',
  },
  {
    id: '003',
    title: 'THE ARTISAN',
    category: 'Documentary',
    genre: 'Red Bull',
    image: 'https://images.unsplash.com/photo-1544256718-3b61027159cb?q=80&w=2670&auto=format&fit=crop',
  },
  {
    id: '004',
    title: 'NEON GRITS',
    category: 'Music Video',
    genre: 'Def Jam',
    image: 'https://images.unsplash.com/photo-1616428701988-cb5fde8c9d1a?q=80&w=2670&auto=format&fit=crop',
  },
];

export const allProjects = [
  ...featuredProjects,
  {
    id: '005',
    title: 'ECLIPSE',
    category: 'Fashion Film',
    genre: 'Givenchy',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2600&auto=format&fit=crop',
  },
  {
    id: '006',
    title: 'BRUTAL',
    category: 'Commercial',
    genre: 'Nike',
    image: 'https://images.unsplash.com/photo-1552066344-2464c1135c32?q=80&w=2670&auto=format&fit=crop',
  },
  {
    id: '007',
    title: 'VOID',
    category: 'Music Video',
    genre: 'OVO',
    image: 'https://images.unsplash.com/photo-1516280440503-6c686145dc53?q=80&w=2670&auto=format&fit=crop',
  },
  {
    id: '008',
    title: 'KINETIC',
    category: 'Documentary',
    genre: 'A24',
    image: 'https://images.unsplash.com/photo-1485848395967-65dff62cb24e?q=80&w=2670&auto=format&fit=crop',
  },
];

export const projectDetails = {
  '001': {
    title: 'NOCTURNAL',
    client: 'Porsche',
    type: 'Commercial',
    director: 'Jane Doe',
    dop: 'John Smith',
    gear: 'Alexa Mini LF, Atlas Orion',
    date: 'OCTOBER 2025',
    videoUrl:
      'https://www.youtube.com/embed/ChxDEAN8EtY?autoplay=1&mute=1&controls=0&showinfo=0&autohide=1&loop=1&playlist=ChxDEAN8EtY&playsinline=1',
    description:
      'A high-octane night shoot exploring the aerodynamic curves and raw power of the new 911 GT3 RS under neon city lights. Minimalist staging, maximum visual impact.',
    images: [
      'https://images.unsplash.com/photo-1503376713292-0b6dc7c2d829?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510903117042-4fdbfb715206?q=80&w=2670&auto=format&fit=crop',
    ],
  },
  default: {
    title: 'ARCHIVE EDIT',
    client: 'Studio',
    type: 'Internal',
    director: 'LNA Team',
    dop: 'Various',
    gear: 'Mixed Digital/Film',
    date: '2024 - 2026',
    videoUrl:
      'https://www.youtube.com/embed/iPE-wP9hNlQ?autoplay=1&mute=1&controls=0&showinfo=0&autohide=1&loop=1&playlist=iPE-wP9hNlQ&playsinline=1',
    description:
      'A compilation of selected works showcasing our uncompromising aesthetic towards visual storytelling and technical precision.',
    images: [
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2666&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2788&auto=format&fit=crop',
    ],
  },
};

/**
 * Get project detail by ID, falls back to default.
 * @param {string} id
 * @returns {object}
 */
export const getProjectById = (id) => projectDetails[id] || projectDetails.default;
