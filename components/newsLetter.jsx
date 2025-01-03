import React from 'react'
import Wrapper from './global/wrapper'
import Container from './global/container'
import { LampContainer } from './ui/lamp'
import { Button } from './ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Input } from './ui/input'

const NewsLetter = () => {
  return (
    <Wrapper className="flex flex-col items-center justify-center py-12 relative">
      <Container>
        <LampContainer>
          <div className="flex flex-col items-center justify-center relative w-full text-center">
            <h2 className="text-3xl lg:text-4xl 2xl:text-4xl mt-6 font-semibold">
              Interact with your thoughts.
              <br /> Create videos faster than ever
            </h2>
            <p className="text-muted-foreground mt-6">
              Engage your thoughts with SaeNius AI Powered, fully automated team
              workflow.
            </p>

            <Button variant={'white'} className="mt-6" asChild>
              <Link href="/sign-in">
                Get started for free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </LampContainer>
      </Container>
      <Container className="relative z-[9999999]">
        <div className="flex items-center justify-center w-full -mt-40">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between w-full px-4 md:px-8 rounded-lg lg:rounded-2xl border border-border/80 py-4 md:py-8">
            <div className="flex flex-col items-start gap-4 w-full">
              <h2 className="text-xl lg:text-2xl 2xl:text-2xl mt-6 font-semibold">
                Join our Newsletter
              </h2>
              <p className="text-muted-foreground text-base">
                Be up to date on everything Nexa
              </p>
            </div>

            <div className="flex flex-col items-start gap-2 md:min-w-80 mt-5 md:mt-0 w-full md:w-max">
              <form
                action="#"
                className="flex flex-col md:flex-row items-center gap-2 w-full md:max-w-xs"
              >
                <Input
                  required
                  type="email"
                  placeholder="Enter your email"
                  className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-primary duration-300 w-full"
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="secondary"
                  className="w-full md:w-max"
                >
                  Subscribe
                </Button>
              </form>

              <p className="text-xs text-muted-foreground">
                By subscribing you agree with our{' '}
                <Link href="#">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Wrapper>
  )
}

export default NewsLetter
