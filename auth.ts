import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { signInZodSchema } from "@/lib/zod";
import Credentials from "next-auth/providers/credentials";

import { authConfig } from './auth.config';
import bcrypt from 'bcrypt';
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  //...authConfig,
  //adapter: PrismaAdapter(prisma),
  providers: [Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // credentials: {
    //   signinUsername: {},
    //   signinPassword: {},
    // },
    authorize: async (credentials) => {
      let user = null;

      console.log(`credential is ${JSON.stringify(credentials)}`);

      const parsedCredentials = await signInZodSchema.safeParseAsync(credentials) ;

      if (parsedCredentials.success) {
        const { signinUsername, signinPassword, role} = parsedCredentials.data;

        console.log(`Successful parsedCredentials, role is ${role}`);

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
        
        if (!user) {
          console.log(`User cannot be found in Database`);
          return null;
        }
        const passwordsMatch = await bcrypt.compare(signinPassword, user.password);
        if (passwordsMatch) {
          console.log("Password Matched for Authentication ", passwordsMatch);
          console.log(`user is ${JSON.stringify(user)}`);
          return user;
        }
      }

      console.log(`parsedCredentials is ${JSON.stringify(parsedCredentials)}`);
      console.log(parsedCredentials.error?.issues[0]?.message);
      // No user found, so this is their first attempt to login
      // Optionally, this is also the place you could do a user registration

      //throw new Error(`${parsedCredentials.error?.issues[0]?.message}`);
      return null;
        
    },
    
  }),
  
  ],
  session: {
    strategy: 'jwt'
},
})