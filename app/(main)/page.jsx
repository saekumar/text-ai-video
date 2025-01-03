'use client'
import Features from '@/components/features'
import Hero from '@/components/hero'
import HowItWorks from '@/components/howItWorks'
import NewsLetter from '@/components/newsLetter'
import Pricing from '@/components/pricing'
import Testimonials from '@/components/testimonials'
import React from 'react'

const HomePage = () => {
  return (
    <section className="w-full relative flex items-center justify-center flex-col px-4 md:px-0 py-8 ">
      <Hero />
      <HowItWorks />
      <Features />
      {/* <Pricing /> */}
      <Testimonials />
      <NewsLetter />
    </section>
  )
}

export default HomePage
