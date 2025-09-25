'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  console.log('RICH', richText)

  return (
    <div
      className="relative -mt-[10.4rem] flex w-full mx-auto px-4 lg:px-16 text-white text-5xl"
      data-theme="dark"
    >
      <div
        className=" mb-8 z-10 relative flex items-center justify-center"
        //className=" mb-8 z-10 relative flex flex-start"
      >
        <div className="md:text-center">
          {richText && (
            <RichText className="mb-6 text-white text-left" data={richText} enableGutter={false} />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center text-left gap-4 font-[Archivio_medium]">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}

//Fira sans bold > title
//Archivio medium > body
