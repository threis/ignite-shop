import './global.css'

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Image from 'next/image'

import logoImg from '@/assets/logo.svg'
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
        <div className="flex flex-col min-h-screen items-start justify-center">
          <header className="py-0 w-full max-w-[1180px] mx-auto">
            <Image src={logoImg} alt="" width={130} height={60} />
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
