import { Request, Response, NextFunction } from 'express';

export const errorHandler = (error: Error,req: Request,res: Response,next: NextFunction): void => {
  
  console.error(error.message);

  res.status(500).json({
    valid: false,
    cardType: 'Unknown',
    message: 'Something went wrong, please try again later',
  });
};