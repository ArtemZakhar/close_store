import { SignJWT, jwtVerify } from 'jose';

const key = new TextEncoder().encode(process.env.AUTH_SECRET);

export const encrypt = async (payload: any, expired?: string) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expired ? expired : '10h from now')
    .sign(key);
};

export const decrypt = async (token: string) => {
  try {
    console.log('key: ',key);
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });

    return payload;
  } catch (err) {
    console.error('Token verification failed:', err);
    return false;
  }
};
