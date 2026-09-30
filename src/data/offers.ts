export const offers = [
  {
    slug: 'dance-movement-therapy',
    key: 'therapy',
    accent: '#c9b58a',
    sessionColors: ['#e4d5b6', '#c9b58a', '#b39968'],
  },
  {
    slug: 'somatics-dance',
    key: 'somatics',
    accent: '#aeb996',
    sessionColors: ['#cdd6bc', '#aeb996', '#8d9878'],
  },
  {
    slug: 'somatic-yoga',
    key: 'yoga',
    accent: '#b7c5c4',
    sessionColors: ['#d3dddc', '#b7c5c4', '#93a6a4'],
  },
] as const;

export type Offer = (typeof offers)[number];
export type OfferSlug = Offer['slug'];

export function getOffer(slug: string) {
  return offers.find((offer) => offer.slug === slug);
}
