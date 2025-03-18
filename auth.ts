import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { signInZodSchema } from "@/lib/zod";
import Credentials from "next-auth/providers/credentials";

import { authConfig } from './auth.config';
import bcrypt from 'bcrypt';
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // credentials: {
    //   signinUsername: {},
    //   signinPassword: {},
    // },
    authorize: async (credentials) => {
      let user = null;

      const parsedCredentials = await signInZodSchema.safeParseAsync(credentials) ;

      if (parsedCredentials.success) {
        const { signinUsername, signinPassword, role} = parsedCredentials.data;

        if (role === "Doctor") {
          user = await prisma.doctor.findUnique({
            where: {
              username: signinUsername,
            },
          })
        }
        else if ( role === "Patient") {
          user = await prisma.user.findUnique({
            where: {
              username: signinUsername,
            },
          })
        }
        
        if (!user) return null;
        const passwordsMatch = await bcrypt.compare(signinPassword, user.password);
        if (passwordsMatch) {
          console.log("Password Matched for Authentication ", passwordsMatch);
          return user;
        }
      }
      // No user found, so this is their first attempt to login
      // Optionally, this is also the place you could do a user registration
      console.log('Invalid credentials');
      return null;
        
    },
  }),
  ],
})