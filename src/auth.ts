import NextAuth, { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { z } from 'zod';
import { compare, hash } from 'bcrypt-ts';
import { prisma } from './lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

// Function to retrieve a user by email
async function getUser(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Internal server error');
  }
}

// NextAuth configuration
export const config: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: '/sign-in', // Redirect to the sign-in page
  },
  callbacks: {
    // authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user;
    //   const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
    //   if (isOnDashboard) {
    //     console.log("logado", nextUrl)
    //     if (isLoggedIn) return true;
    //     return false; // Redirect unauthenticated users to login page
    //   } else if (isLoggedIn) {
    //     console.log("logado tambem")
    //     return Response.redirect(new URL('/dashboard', nextUrl));
    //   }
    //   console.log("chegou no login")
    //   return true;
    // },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // Handle new Google users
      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   // Log for debugging
    //   console.log("Redirect callback:", url, baseUrl);

    //   // Redirect to the dashboard after login
    //   // if (url === baseUrl) {
    //   //   return `${baseUrl}/dashboard`;
    //   // }
    //   // Allow relative redirects or external URLs
    //   // if (url.startsWith('/')) {
    //   //   return `${baseUrl}${url}`;
    //   // }
    //   return baseUrl;
    // },

  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Missing credentials');
        }

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          // Simulate password check (ensure you have hashed passwords in your DB)
          const passwordsMatch = await compare(password, user?.password || '');

          if (user && passwordsMatch) {
            return user;
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
  ],
};

// Default export for NextAuth handler
export const { auth, signIn, signOut, handlers } = NextAuth(config);