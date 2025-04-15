
import { Request, Response, NextFunction } from 'express';

export class ErrorHandler {
  public static handleError(err: Error, req: Request, res: Response, next: NextFunction): void {
    console.error('Error:', err);
    
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
  }

  public static notFound(req: Request, res: Response, next: NextFunction): void {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  }
}
