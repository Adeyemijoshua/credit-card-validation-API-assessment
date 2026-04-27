import { CARD_PATTERNS } from '../constants/cardPatterns';
import { TCardType } from '../types/card.types';

export const detectCardType = (cardNumber: string): TCardType => {
  for (const card of CARD_PATTERNS) {
    if (card.pattern.test(cardNumber) && card.lengths.includes(cardNumber.length)) {
      return card.type;
    }
  }
  return 'Unknown';
};


export const luhnCheck = (cardNumber: string): boolean => {
  let total = 0;

  for (let i = 0; i < cardNumber.length; i++) {
    let digit = parseInt(cardNumber[cardNumber.length - 1 - i]);

    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    total += digit;
  }

  return total % 10 === 0;
};