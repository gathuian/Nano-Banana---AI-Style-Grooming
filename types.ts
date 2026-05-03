
export interface HairStyle {
  id: string;
  name: string;
  matchScore: number;
  image: string;
  description: string;
  maintenance: 'Low' | 'Medium' | 'High';
  bestFor: string[];
}

export type VibeType = 'bold' | 'classic' | 'natural' | 'fun' | 'wild';
export type SpeciesType = 'Human' | 'Pet';
export type GenderType = 'Male' | 'Female' | 'Neutral';

export interface UserPreference {
  vibe: VibeType;
  species: SpeciesType;
  gender: GenderType;
  breed?: string;
  furType?: string;
}

export interface FavoriteItem {
  id: string;
  timestamp: number;
  styleName: string;
  description: string;
  originalImage: string | null;
  generatedImage: string;
  vibe: string;
  species: string;
}

export interface GenerationResult {
  imageUrl: string;
  styleName: string;
  description: string;
}

export interface UserProfile {
  name: string;
  favorites: FavoriteItem[];
}
