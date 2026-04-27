import { TCardType } from '../types/card.types';

export const CARD_PATTERNS: { type: TCardType; pattern: RegExp; lengths: number[] }[] = [
  { type: 'Verve',      pattern: /^(5061|6500|6220|6304)/, lengths: [16, 18, 19] },
  { type: 'Visa',       pattern: /^4/,                     lengths: [13, 16] },
  { type: 'Mastercard', pattern: /^(5[1-5]|2[2-7])/,       lengths: [16] },
];

export const MAX_CARD_LENGTH = 19;
export const MIN_CARD_LENGTH = 13;