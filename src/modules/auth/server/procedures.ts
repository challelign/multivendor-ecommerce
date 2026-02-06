import { createTRPCRouter, baseProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { AUTH_COOKIE } from "./constants";
import { loginSchema, registerSchema } from "../schemas";
import { generateAuthCookie } from "../utils";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = await ctx.db.auth({ headers });
    return session;
  }),
  register: baseProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password, username } = input;

      const existingData = await ctx.db.find({
        collection: "users",
        limit: 1,
        where: {
          username: {
            equals: username,
          },
        },
      });

      const existingUser = existingData.docs[0];
      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already exists",
        });
      }

      await ctx.db.create({
        collection: "users",
        data: {
          email,
          password, // this will be hashed
          username,
        },
      });

      // user login after register
      const data = await ctx.db.login({
        collection: "users",
        data: {
          email,
          password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login,Invalid credentials",
        });
      }

      await generateAuthCookie({
        prefix: ctx.db.config.cookiePrefix,
        value: data.token,
      });
      // const cookies = await getCookies();
      // cookies.set({
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   // sameSite: "strict",
      //   path: "/",
      //   name: AUTH_COOKIE,
      //   value: data.token,
      // });
    }),

  login: baseProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const { email, password } = input;
    const data = await ctx.db.login({
      collection: "users",
      data: {
        email,
        password,
      },
    });

    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Failed to login,Invalid credentials",
      });
    }

    // const cookies = await getCookies();
    // cookies.set({
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   // sameSite: "strict",
    //   path: "/",
    //   name: AUTH_COOKIE,
    //   value: data.token,
    // });
    await generateAuthCookie({
      prefix: ctx.db.config.cookiePrefix,
      value: data.token,
    });

    return data;
  }),
});
