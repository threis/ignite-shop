import Stripe from 'stripe'

import { env } from '@/env'

export const stripe = new Stripe(env.SECRET_KEY_STRIPE, {
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'Ignite Shop',
  },
})
