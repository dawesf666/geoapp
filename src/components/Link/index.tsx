import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  isNav?: boolean
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    isNav,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}
  const customNav =
    'hover:bg-[#056A38] hover:text-white focus:bg-[#056A38]focus:text-white transition-transform duration-200 ease-in-out hover:[transform:scale(1.2)]'

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className, isNav && customNav)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  if (appearance === 'outline') {
    return (
      <Link
        className="bg-[#056A38] text-3xl rounded-xl p-6 text-white hover:bg-[[#104C82]]"
        href={href || url || ''}
        {...newTabProps}
      >
        {label && label}
        {children && children}
      </Link>
    )
  }

  // return (
  //   <Button asChild className={className } size={size} variant={appearance} >
  //     <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
  //       {label && label}
  //       {children && children}
  //       {isNav}
  //     </Link>
  //   </Button>
  // )
  //console.log('isNav', isNav)
  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className, isNav && customNav)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
        {isNav}
      </Link>
    </Button>
  )
}
