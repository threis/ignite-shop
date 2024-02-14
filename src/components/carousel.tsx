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
      className="keen-slider ml-auto flex min-h-[656px] w-full max-w-home"
      ref={sliderRef}
    >
      {children}
    </div>
  )
}
