import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from '@/lib/prisma'
import {createAuthMiddleware, APIError} from 'better-auth/api'
import { passwordSchema } from './validation'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  socialProviders:{
google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
},

github: {
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
}
  },


  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
        role: {
            type: 'string',
            input: false
        }
    }
  },

  hooks: {
    before: createAuthMiddleware(async ctx => {
      if (ctx.path === '/sign-up/email') {
        const password = ctx.body.password;
        const { error } = passwordSchema.safeParse(password);

        if (error) {
          throw new APIError('BAD_REQUEST', {
            message: "Password not strong enough"
          });
        }
      }
    })
  }
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user