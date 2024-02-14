import './global.css'

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { Header } from '@/components/header'

import { CartProvider } from './context/cart-context'
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | IgniteShop',
    default: 'IgniteShop',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={roboto.className}>
      <body className="bg-gray900 text-gray100 antialiased">
        <CartProvider>
          <div className="flex flex-col min-h-screen items-start justify-center relative">
            <Header />
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
