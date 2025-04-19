// data/playlists.ts

// Define the necessary interfaces that were likely in this file before

export interface Affirmation {
  id: string;
  title: string;
  duration: string;
  audioUrl?: string;
}

export interface PlaylistItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  affirmationCount: number;
  coverImage: string;
  affirmations: Affirmation[];
}

// Export the playlists array
export const playlists: PlaylistItem[] = [
  {
    id: 'dummy',
    // ... rest of dummy data ...
  }
]; 