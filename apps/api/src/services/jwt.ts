import { sign, verify, type JWTPayload } from "hono/jwt";

interface TokenPayload extends JWTPayload {
  userId: string;
  username: string;
}

const SECRET = process.env.JWT_SECRET || "dev-secret-change-in-production";
const EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days

export async function signToken(payload: Omit<TokenPayload, "exp" | "iat">): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  return sign(
    {
      ...payload,
      iat: now,
      exp: now + EXPIRES_IN,
    },
    SECRET
  );
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const payload = await verify(token, SECRET);
    return payload as TokenPayload;
  } catch {
    return null;
  }
}
