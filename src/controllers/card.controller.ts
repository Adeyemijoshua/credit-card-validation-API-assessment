import { RequestHandler } from 'express';
import { cardValidationSchema } from '../validators/card.validator';
import { detectCardType, luhnCheck } from '../services/card.service';
import { ICardResponse } from '../types/card.types';

export const validateCard: RequestHandler = (req, res, next): void => {
  try {
    const parsed = cardValidationSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        valid: false,
        cardType: 'Unknown',
        message: parsed.error.errors[0].message,
      });
      return;
    }

    const { cardNumber } = parsed.data;
    const sanitizedCardNumber = cardNumber.replace(/[\s-]/g, '');

    if (!/^\d+$/.test(sanitizedCardNumber)) {
      res.status(400).json({
        valid: false,
        cardType: 'Unknown',
        message: 'Card number must contain only digits',
      });
      return;
    }

    const cardType = detectCardType(sanitizedCardNumber);
    const isValid = luhnCheck(sanitizedCardNumber);

    const response: ICardResponse = {
      valid: isValid,
      cardType,
      message: isValid ? 'Card number is valid' : 'Card number is invalid',
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};