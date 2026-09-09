import dbConnect from "@/lib/dbConnect";
import { User } from "lucide-react";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("This is token: ", token);
      console.log("This is user: ", user);
      console.log("This is account: ", account);

      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    async signIn({ user, profile }) {
      await dbConnect();
      let dbUser = await User.findOne({ email: user.email });

      // if user not found create new user
      if (!dbUser) {
        dbUser = await User.create({
          name: profile.name,
          email: profile.email,
          profilePicture: profile.profilePicture,
          isVerified: profile.email_verified ? true : false,
        });
      }
      user.id = dbUser._id.toString();
      return true;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 90 * 24 * 60 * 60,
  },
  pages: {
    singIn: "user-auth",
  },
};

const handle = NextAuth(authOptions);
export { handle as POST, handle as GET };
