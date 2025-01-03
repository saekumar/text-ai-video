import React from 'react'
import { footerLinks } from '@/constants'
import Icons from '../global/icons'
import { Heart } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="flex flex-col relative items-center justify-center border-t border-border pt-16 lg:pt-32 pb-8 px-6 lg:px-8 w-full max-w-6xl mx-auto">
      <div className="hidden lg:block absolute -top-1/3 -right-1/4 bg-primary w-72 h-72 rounded-full -z-10 blur-[14rem]" />
      <div className="hidden lg:block absolute bottom-0 -top-1/3 -left-1/4 bg-primary w-72 h-72 rounded-full -z-10 blur-[14rem]" />

      <div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">
        <div className="flex flex-col items-start justify-start md:max-w-[200px]">
          <div className="flex items-start">
            <Icons.logo className="h-7 w-7" />
          </div>
          <p className="text-muted-foreground mt-4 text-sm text-start">
            Engage your customers today with SaeNius AI.
          </p>
          <span className="mt-4 text-neutral-200 text-sm flex items-center">
            Made with{' '}
            <Heart className="w-3.5 h-3.5 mx-1 fill-primary text-primary" />
            by SaiKumar
          </span>
        </div>

        <div className="grid grid-cols-4 gap-8 mt-16 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <div
              key={index}
              className={`${
                index % 2 === 1 ? 'mt-10 md:mt-0' : ''
              } md:grid md:grid-cols-2 md:gap-8`}
            >
              <div className="">
                <h3 className="text-base font-medium text-white">
                  {section.title}
                </h3>

                <ul className="mt-4 text-sm text-muted-foreground">
                  {section.links.map((link, index) => (
                    <li key={index} className={`${index > 0 ? 'mt-2' : ''}`}>
                      <Link
                        href={'#'}
                        className="hover:text-foreground transition-all duration-300 ease-in-out"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 border-t border-border/40 pt-4 md:pt-8 md:flex md:items-center md:justify-between w-full">
        <p className="text-sm text-muted-foreground mt-8 md:mt-0">
          &copy; {new Date().getFullYear()} Nexa Technologies Inc. All rights
          reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
