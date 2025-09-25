// 'use client'
// import { useHeaderTheme } from '@/providers/HeaderTheme'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React, { useEffect, useState } from 'react'

// import type { Header } from '@/payload-types'

// import { Logo } from '@/components/Logo/Logo'
// import { HeaderNav } from './Nav'

// interface HeaderClientProps {
//   data: Header
// }

// export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
//   /* Storing the value in a useState to avoid hydration errors */
//   const [theme, setTheme] = useState<string | null>(null)
//   const { headerTheme, setHeaderTheme } = useHeaderTheme()
//   const pathname = usePathname()

//   useEffect(() => {
//     setHeaderTheme(null)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pathname])

//   useEffect(() => {
//     if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [headerTheme])

//   return (
//     <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
//       <div className="py-8 flex justify-between">
//         <Link href="/">
//           <Logo loading="eager" priority="high" className="invert dark:invert-0" />
//         </Link>
//         <HeaderNav data={data} />
//       </div>
//     </header>
//   )
// }
'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Menu, X } from 'lucide-react'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setHeaderTheme(null)
    setMenuOpen(false) // chiudi menu a ogni cambio pagina
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme])

  return (
    // <header className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
    //   <div className="flex items-center justify-between py-6 gap-16">
    //     {/* Logo */}
    //     <Link href="/">
    //       <Logo loading="eager" priority="high" className="invert dark:invert-0 h-8 w-auto" />
    //     </Link>

    //     {/* Hamburger button visibile solo su mobile */}
    //     <button
    //       className="sm:hidden"
    //       onClick={() => setMenuOpen((prev) => !prev)}
    //       aria-label="Toggle menu"
    //     >
    //       {menuOpen ? (
    //         <X className="h-6 w-6 text-black dark:text-white" />
    //       ) : (
    //         <Menu className="h-6 w-6 text-black dark:text-white" />
    //       )}
    //     </button>

    //     {/* Navigation (HeaderNav) */}
    //     <div
    //       className={`
    //         absolute left-0 right-0 top-full z-10 w-full bg-white dark:bg-zinc-900 shadow-md sm:static sm:shadow-none sm:bg-transparent sm:dark:bg-transparent
    //         ${menuOpen ? 'block' : 'hidden'} sm:block
    //       `}
    //     >
    //       <HeaderNav data={data} />
    //     </div>
    //   </div>
    // </header>
    <header className=" relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="w-full mx-auto px-4 lg:px-16">
        <div
          //className="flex lg:xl:justify-between align-center py-6 gap-16"
          className="flex justify-between align-center py-6 content-center gap-16"
        >
          <Link href="/">
            <Logo loading="eager" priority="high" className="invert dark:invert-0 h-8 w-auto" />
          </Link>
          <div className="py-5 lg:xl:py-8">
            {/* Hamburger button visibile solo su mobile */}
            <button
              className="sm:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="h-6 w-6 text-black dark:text-white" />
              ) : (
                <Menu className="h-6 w-6 text-black dark:text-white" />
              )}
            </button>

            {/* Navigation (HeaderNav) */}
            <div
              className={`
          absolute left-0 right-0  z-10 w-full bg-white shadow-md sm:static sm:shadow-none sm:bg-transparent sm:dark:bg-transparent grid
          ${menuOpen ? 'block' : 'hidden'} 
        `}
            >
              <HeaderNav data={data} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
