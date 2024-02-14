'use client'

import { Handbag } from '@phosphor-icons/react'

export interface FooterProps {
  name: string
  price: string
}

export function Footer({ name, price }: FooterProps) {
  return (
    <footer className="absolute bottom-1 left-1 right-1 flex translate-y-[100%] items-center justify-between rounded-md bg-black/60 p-8 opacity-0 transition delay-200 ease-in-out group-hover:translate-y-[0%] group-hover:opacity-100">
      <div className="flex flex-col">
        <strong className="text-lg ">{name}</strong>
        <span className="text-xl font-bold text-green300">{price}</span>
      </div>
      <span className="flex size-14 items-center justify-center rounded-md bg-green500">
        <Handbag className="size-8 font-bold text-white" />
      </span>
    </footer>
  )
}
