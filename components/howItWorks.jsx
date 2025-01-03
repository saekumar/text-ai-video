import React from 'react'
import Wrapper from './global/wrapper'
import Container from './global/container'
import SectionBadge from './ui/section-badge'
import { perks } from '@/constants'

const HowItWorks = () => {
  return (
    <Wrapper className="flex flex-col items-center justify-center py-12 relative">
      {/** HEADER AREA */}
      <Container>
        <div className="max-w-lg mx-auto text-start md:text-center">
          <SectionBadge title="How it works" />

          <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
            Discover the simplicity of our process
          </h2>
          <p className="text-muted-foreground mt-6">
            We have made it super easy to get started with our platform. We
            believe that anyone can use our platform without any prior knowledge
            of coding or web development.
          </p>
        </div>
      </Container>

      <Container>
        <div className="flex flex-col items-center justify-center py-10 md:py-20 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full divide-x-0 md:divide-x divide-y md:divide-y-0 divide-gray-900 first:border-l-2 lg:first:border-none first:border-gray-900">
            {perks?.map((perk) => (
              <div
                className="flex flex-col items-start px-4 md:px-6 lg:px-8 py-4 lg:py-8"
                key={perk.title}
              >
                <div className="flex items-center justify-center">
                  <perk.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium mt-4">{perk.title}</h3>
                <p className="text-muted-foreground mt-2 text-start lg:text-start">
                  {perk.info}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Wrapper>
  )
}

export default HowItWorks
