'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef, useState } from 'react'

type InfiniteLogoScrollerProps = {
  logos: string[] // Array of image URLs
  direction?: 'left' | 'right'
  speed?: 'fast' | 'normal' | 'slow'
  pauseOnHover?: boolean
  className?: string
  logoClassName?: string
}

export const InfiniteLogoScroller = ({
  logos,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
  logoClassName,
}: InfiniteLogoScrollerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    if (scrollerRef.current && containerRef.current) {
      const children = Array.from(scrollerRef.current.children)
      children.forEach((child) => {
        const clone = child.cloneNode(true)
        scrollerRef.current?.appendChild(clone)
      })

      containerRef.current.style.setProperty(
        '--animation-direction',
        direction === 'left' ? 'forwards' : 'reverse',
      )

      const duration = speed === 'fast' ? '20s' : speed === 'normal' ? '40s' : '80s'
      containerRef.current.style.setProperty('--animation-duration', duration)

      setStart(true)
    }
  }, [direction, speed])

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller z-10  overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]',
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex justify-center align-center w-max min-w-full shrink-0 flex-nowrap gap-10 py-4',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        {logos.map((logo, i) => (
          <li key={i} className="flex items-center justify-center">
            <img
              src={logo}
              alt={`Logo ${i + 1}`}
              className={cn('h-12 w-auto object-contain', logoClassName)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
