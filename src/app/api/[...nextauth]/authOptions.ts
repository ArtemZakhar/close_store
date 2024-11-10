import { connectToAuthDatabase } from '@/lib/mongoDb';
import User, { UserSchemaType } from '@/models/Users';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

import bcrypt from 'bcrypt';

const clientPromise = connectToAuthDatabase();
export const authOptions: NextAuthOptions = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'User Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await User.findOne({
          email: credentials.email,
        }).lean<UserSchemaType>();

        if (!user) {
          return null;
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password as string,
        );

        if (!isPasswordCorrect) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),

  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 12,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 60 * 60 * 12,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session && session.user) {
        session.user = {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
        };
        return session;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },
});
