'use client'

import 'keen-slider/keen-slider.min.css'

import { useKeenSlider } from 'keen-slider/react'

export interface CarouselProps {
  children: React.ReactNode
}

export function Carousel({ children }: CarouselProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })
  return (
    <div
      className="flex max-w-home w-full ml-auto min-h-[656px] mt-8 keen-slider"
      ref={sliderRef}
    >
      {children}
    </div>
  )
}
