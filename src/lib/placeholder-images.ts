
import data from './placeholder-images.json';

export type PlaceholderImage = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  category: string;
};

export const placeholderImages: PlaceholderImage[] = data.placeholderImages;
