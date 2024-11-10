/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['mui-file-input'],
  env: {
    MONGO_URL:
      'mongodb+srv://artemzakharchuk:p69RUunZu25tY1It@artemzakharchuk.efhi8fb.mongodb.net/artemzakharchuk?retryWrites=true&w=majority',
    BASE_URL: 'http://localhost:3000/',
    MY_EMAIL: 'artem.zakharchuk@ukr.net',
    MY_PASSWORD: 'eRqZvm5Zsju2ktiM',
    JWT_SECRET: 'Varto',
    AUTH_SECRET: 'PowPatrol',
  },
};

export default nextConfig;
