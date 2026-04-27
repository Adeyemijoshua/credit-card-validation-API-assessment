export type TCardType =
  | 'Visa'
  | 'Mastercard'
  | 'Verve'
  | 'Unknown';

export interface ICardRequest {
  cardNumber: string;
}

export interface ICardResponse {
  valid: boolean;
  cardType: TCardType;
  message: string;
}