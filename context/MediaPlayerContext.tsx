import React, { createContext, useContext, useState, ReactNode } from "react";
import { PlaylistItem } from "@/types";

interface MediaPlayerContextType {
  isVisible: boolean;
  currentPlaylist: PlaylistItem | null;
  showPlayer: (playlist: PlaylistItem) => void;
  hidePlayer: () => void;
}

const MediaPlayerContext = createContext<MediaPlayerContextType | undefined>(
  undefined
);

export function MediaPlayerProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistItem | null>(
    null
  );

  const showPlayer = (playlist: PlaylistItem) => {
    setCurrentPlaylist(playlist);
    setIsVisible(true);
  };

  const hidePlayer = () => {
    setIsVisible(false);
  };

  return (
    <MediaPlayerContext.Provider
      value={{
        isVisible,
        currentPlaylist,
        showPlayer,
        hidePlayer,
      }}
    >
      {children}
    </MediaPlayerContext.Provider>
  );
}

export function useMediaPlayer() {
  const context = useContext(MediaPlayerContext);
  if (context === undefined) {
    throw new Error("useMediaPlayer must be used within a MediaPlayerProvider");
  }
  return context;
}
