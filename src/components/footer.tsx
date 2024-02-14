'use client'

import { Handbag } from '@phosphor-icons/react'

export interface FooterProps {
  name: string
  price: string
}

export function Footer({ name, price }: FooterProps) {
  return (
    <footer className="absolute bottom-1 left-1 right-1 flex items-center justify-between rounded-md transition ease-in-out delay-200 bg-black/60 p-8 opacity-0 translate-y-[100%] group-hover:opacity-100 group-hover:translate-y-[0%]">
      <div className="flex flex-col">
        <strong className="text-lg ">{name}</strong>
        <span className="text-xl font-bold text-green300">{price}</span>
      </div>
      <span className="size-14 flex items-center justify-center bg-green500 rounded-md">
        <Handbag className="text-white size-8 font-bold" />
      </span>
    </footer>
  )
}
