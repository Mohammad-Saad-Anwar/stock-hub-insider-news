
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export class AuthMiddleware {
  public static authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return;
      }
      
      const token = authHeader.split(' ')[1];
      const secretKey = process.env.JWT_SECRET || 'default_secret_key';
      
      const decoded = jwt.verify(token, secretKey) as {
        id: string;
        email: string;
        role: string;
      };
      
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  }

  public static authorizeAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
    if (req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Forbidden: Admin access required' });
      return;
    }
    
    next();
  }
}
