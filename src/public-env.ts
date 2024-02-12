import { z } from 'zod'

const publicEnvScheme = z.object({
  NEXT_PUBLIC_KEY_STRIPE: z.string(),
})

const parsedEnv = publicEnvScheme.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variable: ',
    parsedEnv.error.flatten().fieldErrors,
  )

  throw new Error('Invalid environment variables.')
}

export const publicEnv = parsedEnv.data
