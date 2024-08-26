import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

import { createGuest, getGuest } from "./data-service";
import { AuthenticationProp } from "@/types/interfaces";

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],

  callbacks: {
    authorized({ auth, request }: any) {
      return !!auth?.user;
    },
    async signIn({ user }: AuthenticationProp) {
      try {
        const existingGuest = await getGuest(user?.email!);
        if (!existingGuest)
          await createGuest({ email: user?.email, fullName: user?.name });

        return true;
      } catch {
        return false;
      }
    },

    async session({ session }: AuthenticationProp) {
      const guest = await getGuest(session?.user?.email!);
      session!.user.guestId = guest?.id;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
