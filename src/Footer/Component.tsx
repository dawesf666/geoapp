import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { LogoWhite } from '@/components/Logo/LogoWhite'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-[#104C82] dark:bg-card text-white">
      <div className="flex items-center justify-center container p-8">
        <Link className="flex items-center" href="/">
          <LogoWhite />
        </Link>
      </div>

      <div className="container py-8 gap-6 flex flex-col md:flex-row md:justify-between">
        {/* <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div> */}

        <div className="block">
          <nav className="flex flex-col">
            {navItems.slice(0, 3).map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>

        <div className="block">
          <nav className="flex flex-col">
            {navItems.slice(3, 6).map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
        {/* <ThemeSelector /> */}
      </div>
      <hr className="mb-4"></hr>
      <div className="block text-center text-xs/5 p-4 mb-4 inter">
        <p>Copyright © 2025</p>
        <p>Web App di proprietà di Nesti Società Cooperativa Impresa Sociale</p>
        <p>Sede legale: Via Savasta, 16 - 95047 Paternò (CT)</p>
        <p>PEC: nestimpresasociale@pec.it - P.IVA: 06057800879 - N. REA: CT - 462431</p>
        <p>
          Il sito internet è realizzato e interamente gestito da nesti società cooperativa impresa
          sociale
        </p>
      </div>
    </footer>
  )
}
