import data from './slideshow-images.json';

export type SlideshowImage = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const slideshowImages: SlideshowImage[] = data.slideshowImages;
