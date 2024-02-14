import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SECRET_KEY_STRIPE: z.string(),
  },

  client: {
    NEXT_PUBLIC_KEY_STRIPE: z.string(),
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },

  runtimeEnv: {
    NEXT_PUBLIC_KEY_STRIPE: process.env.NEXT_PUBLIC_KEY_STRIPE,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    SECRET_KEY_STRIPE: process.env.SECRET_KEY_STRIPE,
  },
  clientPrefix: 'NEXT_PUBLIC_',
})
