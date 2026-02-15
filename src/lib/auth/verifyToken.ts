import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export interface jwtPayload {
  id: number;
  iat: number;
  exp: number;
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret) as jwtPayload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};
