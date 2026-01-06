import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/shema/zod";
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password";
import { getUserFromDb } from "@/utils/user";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/utils/prisma";
import bcryptjs from "bcryptjs";

// NextAuth конфігурація
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // authorize повертає тип Promise<User | null>
      authorize: async (
        credentials
      ): Promise<{
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
      } | null> => {
        try {
          //   let user = null;

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email та пароль обов'язкові");
          }

          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // logic to salt and hash password
          //   const pwHash = saltAndHashPassword(password);

          // logic to verify if the user exists
          //   user = await getUserFromDb(email, pwHash);
          const user = await getUserFromDb(email);

          if (!user || !user.password) {
            // повертаємо null, якщо користувач не знайдений
            return null;
            // throw new Error("Невірне введення даних / Invalid credentials.");
          }

          const isPasswordValid = await bcryptjs.compare(
            password,
            user.password
          );

          if (!isPasswordValid) {
            // повертаємо null, якщо пароль не валідний
            return null;
          }

          // return JSON object with the user data
          return {
            id: user.id,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }

          // catch other errors
          console.error(error);
          return null;
        }
      },
    }),
  ],
});

// import NextAuth from "next-auth";
// import { ZodError } from "zod";
// import Credentials from "next-auth/providers/credentials";
// import { signInSchema } from "@/shema/zod";
// // Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password";
// import { getUserFromDb } from "@/utils/user";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import prisma from "@/utils/prisma";
// import bcryptjs from "bcryptjs";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     Credentials({
//       // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//       // e.g. domain, username, password, 2FA token, etc.
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//         try {
//           //   let user = null;

//           if (!credentials?.email || !credentials?.password) {
//             throw new Error("Email та пароль обов'язкові");
//           }

//           const { email, password } = await signInSchema.parseAsync(
//             credentials
//           );

//           // logic to salt and hash password
//           //   const pwHash = saltAndHashPassword(password);

//           // logic to verify if the user exists
//           //   user = await getUserFromDb(email, pwHash);
//           const user = await getUserFromDb(email);

//           if (!user || !user.password) {
//             throw new Error("Невірне введення даних / Invalid credentials.");
//           }

//           const isPasswordValid = await bcryptjs.compare(
//             password,
//             user.password
//           );

//           // return JSON object with the user data
//           return user;
//         } catch (error) {
//           if (error instanceof ZodError) {
//             // Return `null` to indicate that the credentials are invalid
//             return null;
//           }
//         }
//       },
//     }),
//   ],
// });
