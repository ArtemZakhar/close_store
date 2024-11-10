import { SignJWT } from 'jose';

const key = new TextEncoder().encode(process.env.AUTH_SECRET);

export const encrypt = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10h from now')
    .sign(key);
};
