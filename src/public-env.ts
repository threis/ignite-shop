import { z } from 'zod'

const publicEnvScheme = z.object({
  NEXT_PUBLIC_KEY_STRIPE: z.string(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
})

console.log(process.env)

const parsedEnv = publicEnvScheme.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variable: ',
    parsedEnv.error.flatten().fieldErrors,
  )

  throw new Error('Invalid environment variables.')
}

export const publicEnv = parsedEnv.data
