
export interface HairStyle {
  id: string;
  name: string;
  matchScore: number;
  image: string;
  description: string;
  maintenance: 'Low' | 'Medium' | 'High';
  bestFor: string[];
}

export type VibeType = 'bold' | 'classic' | 'natural' | 'fun';
