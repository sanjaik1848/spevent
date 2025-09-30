
import data from './hero-images.json';

export type HeroImage = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const heroImages: HeroImage[] = data.heroImages;
