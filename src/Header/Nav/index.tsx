'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    // <nav className="flex gap-3 items-center">
    //   {navItems.map(({ link }, i) => {
    //     return <CMSLink key={i} {...link} appearance="link" />
    //   })}
    //   <Link href="/search">
    //     <span className="sr-only">Search</span>
    //     <SearchIcon className="w-5 text-primary" />
    //   </Link>
    // </nav>
    // <nav className="flex gap-3 items-center text-xl font-bold">
    //   {navItems.map(({ link }, i) => {
    //     return (
    //       <CMSLink key={i} {...link} isNav={true} appearance="inline" className="bg-transparent" />
    //     )
    //   })}
    // </nav>
    <nav className="items-start text-md lg:xl:flex-end lg:xl:flex-col lg:xl:gap-6 lg:xl:text-3xl font-bold xl:gap-4 px-6 py-4 sm:p-0 uppercase mx-2 text-[#104C82]">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            isNav={true}
            appearance="inline"
            className="bg-transparent w-full sm:w-auto mx-2 hover:[transform:scale(1.5)] hover:bg-[#056A38]"
          />
        )
      })}
    </nav>
  )
}
