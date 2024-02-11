'use client'

import 'keen-slider/keen-slider.min.css'

import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'

import camiseta1 from '../assets/1.png'
import camiseta2 from '../assets/2.png'
import camiseta3 from '../assets/3.png'

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <div
      className="flex max-w-home w-full ml-auto min-h-[656px] keen-slider"
      ref={sliderRef}
    >
      <a
        href=""
        className="bg-gradient-to-t from-grad-purple to-grad-green rounded-lg cursor-pointer relative flex items-center justify-center overflow-hidden group keen-slider__slide"
      >
        <Image
          src={camiseta1}
          width={520}
          height={520}
          className="object-cover"
          alt=""
        />
        <footer className="absolute bottom-1 left-1 right-1 flex items-center justify-between rounded-md transition ease-in-out delay-200 bg-black/60 p-8 opacity-0 translate-y-[100%] group-hover:opacity-100 group-hover:translate-y-[0%]">
          <strong className="text-lg ">Camiseta X</strong>
          <span className="text-xl font-bold text-green300">R$ 79,90</span>
        </footer>
      </a>
      <a
        href=""
        className="bg-gradient-to-t from-grad-purple to-grad-green rounded-lg cursor-pointer relative flex items-center justify-center overflow-hidden group keen-slider__slide"
      >
        <Image
          src={camiseta2}
          width={520}
          height={520}
          className="object-cover"
          alt=""
        />
        <footer className="absolute bottom-1 left-1 right-1 flex items-center justify-between rounded-md transition ease-in-out delay-200 bg-black/60 p-8 opacity-0 translate-y-[100%] group-hover:opacity-100 group-hover:translate-y-[0%]">
          <strong className="text-lg ">Camiseta X</strong>
          <span className="text-xl font-bold text-green300">R$ 79,90</span>
        </footer>
      </a>
      <a
        href=""
        className="bg-gradient-to-t from-grad-purple to-grad-green rounded-lg cursor-pointer relative flex items-center justify-center overflow-hidden group keen-slider__slide"
      >
        <Image
          src={camiseta3}
          width={520}
          height={520}
          className="object-cover"
          alt=""
        />
        <footer className="absolute bottom-1 left-1 right-1 flex items-center justify-between rounded-md transition ease-in-out delay-200 bg-black/60 p-8 opacity-0 translate-y-[100%] group-hover:opacity-100 group-hover:translate-y-[0%]">
          <strong className="text-lg ">Camiseta X</strong>
          <span className="text-xl font-bold text-green300">R$ 79,90</span>
        </footer>
      </a>
      <a
        href=""
        className="bg-gradient-to-t from-grad-purple to-grad-green rounded-lg cursor-pointer relative flex items-center justify-center overflow-hidden group keen-slider__slide"
      >
        <Image
          src={camiseta3}
          width={520}
          height={520}
          className="object-cover"
          alt=""
        />
        <footer className="absolute bottom-1 left-1 right-1 flex items-center justify-between rounded-md transition ease-in-out delay-200 bg-black/60 p-8 opacity-0 translate-y-[100%] group-hover:opacity-100 group-hover:translate-y-[0%]">
          <strong className="text-lg ">Camiseta X</strong>
          <span className="text-xl font-bold text-green300">R$ 79,90</span>
        </footer>
      </a>
    </div>
  )
}
