import Stripe from 'stripe'

import { secretEnv } from '@/secret-env'

export const stripe = new Stripe(secretEnv.SECRET_KEY_STRIPE, {
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'Ignite Shop',
  },
})
