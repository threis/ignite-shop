import { z } from 'zod'

const secretEnvScheme = z.object({
  SECRET_KEY_STRIPE: z.string(),
})

const parsedEnv = secretEnvScheme.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variable: ',
    parsedEnv.error.flatten().fieldErrors,
  )

  throw new Error('Invalid environment variables.')
}

export const secretEnv = parsedEnv.data
