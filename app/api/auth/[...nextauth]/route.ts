import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Account, Profile, Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

interface GithubProfile extends Profile {
  login?: string;
  avatar_url?: string;
}

interface GoogleProfile extends Profile {
  picture?: string;
  email_verified?: boolean;
}

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: { token: JWT; user?: { id: string }; account?: Account | null }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id ?? "";
      return session;
    },
    async signIn({ user, profile }: { user: { email?: string | null; id: string }; profile?: Profile }) {
      await dbConnect();
      let dbUser = await User.findOne({ email: user.email });

      if (!dbUser) {
        dbUser = await User.create({
          name: profile?.name,
          email: profile?.email,
          profilePicture: (profile as GoogleProfile)?.picture,
          isVerified: (profile as GoogleProfile)?.email_verified ? true : false,
        });
      }
      user.id = dbUser._id.toString();
      return true;
    },
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 90 * 24 * 60 * 60,
  },
  pages: {
    signIn: "user-auth",
  },
};

const handle = NextAuth(authOptions);
export { handle as POST, handle as GET };
