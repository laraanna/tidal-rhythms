export const offers = [
  {
    slug: 'dance-movement-therapy',
    key: 'therapy',
    accent: '#c9b58a',
    sessionColors: ['rgb(188 172 129 / 0.4)', 'rgb(188 172 129 / 0.65)', '#BCAC81'],
    calendly: 'https://calendly.com/mayosmith-mytam/dance-movement-therapy-session',
  },
  {
    slug: 'somatics-dance',
    key: 'somatics',
    accent: '#aeb996',
    sessionColors: [
      'rgb(168 177 148 / 0.3)',
      'rgb(168 177 148 / 0.4)',
      'rgb(168 177 148 / 0.6)',
      'rgb(168 177 148 / 0.7)',
      '#A8B194',
    ],
    calendly: 'https://calendly.com/mayosmith-mytam/introduction-call',
  },
  {
    slug: 'somatic-yoga',
    key: 'yoga',
    accent: '#b7c5c4',
    sessionColors: ['#CFE2DD', '#B8CDC8', '#AABBB7', '#96A8A4'],
    calendly: 'https://calendly.com/mayosmith-mytam/1-1-somatic-yoga',
  },
] as const;

export type Offer = (typeof offers)[number];
export type OfferSlug = Offer['slug'];

export function getOffer(slug: string) {
  return offers.find((offer) => offer.slug === slug);
}
