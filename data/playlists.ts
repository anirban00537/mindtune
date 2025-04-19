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

// Optionally, add the playlists array back if needed by other parts of the app
// export const playlists: PlaylistItem[] = []; 