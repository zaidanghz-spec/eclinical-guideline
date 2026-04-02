import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export function getDb() {
  // Remove channel_binding parameter which is not supported by @neondatabase/serverless
  const url = (process.env.DATABASE_URL || '').replace('&channel_binding=require', '').replace('?channel_binding=require', '');
  const sql = neon(url);
  return sql;
}

export function verifyToken(authHeader: string | null): JwtPayload | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.substring(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return payload;
  } catch {
    return null;
  }
}

export function createToken(userId: string, email: string, role: string): string {
  return jwt.sign(
    { userId, email, role } as JwtPayload,
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );
}
