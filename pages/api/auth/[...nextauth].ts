import nextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';

export default nextAuth({
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'database',
  },
  providers: [
    GithubProvider({
      clientId: process.env?.GITHUB_ID ?? '',
      clientSecret: process.env?.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env?.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env?.GOOGLE_CLIENT_SECRET ?? '',
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env?.EMAIL_SERVER_PORT ?? ''),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      // sendVerificationRequest,
    }),
  ],
  adapter: PrismaAdapter(prisma),
});
