'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

export function AboutHero() {
  return (
    <div className="relative mx-auto  flex flex-col items-center justify-center space-y-6">
      {/* <Navbar /> */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-16 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-3xl font-bold text-[#104C82] md:text-4xl lg:text-7xl dark:text-slate-300">
          {`TerraPiena l'app del territorio a portata di tutti`.split(' ').map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: 'easeInOut',
              }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-2xl py-4 text-center text-3xl font-bold text-black dark:text-neutral-400 "
        >
          Con TerraPiena puoi contribuire a salvaguardare il territorio segnalando situazioni non
          consoni.
        </motion.p>
        {/* <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-auto text-2xl transform rounded-xl bg-[#104C82] p-10 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#056A38] dark:bg-white dark:text-black dark:hover:bg-gray-200">
            <Link href="/map"> Scopri la mappa</Link>
          </button>
          <button className="w-auto text-2xl transform rounded-xl border border-gray-300 bg-[#056A38] p-10 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#104C82] dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            <Link href="/segnala">Partecipa attivamente</Link>
          </button>
        </motion.div> */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-8 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <Link
            href="/map"
            className="flex h-24 w-full items-center justify-center rounded-xl bg-[#104C82] px-10 text-2xl font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#056A38] dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Scopri la mappa
          </Link>

          <Link
            href="/segnala"
            className="flex h-24 w-full items-center justify-center rounded-xl border border-gray-300 bg-[#056A38] px-10 text-2xl font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#104C82] dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900"
          >
            Partecipa attivamente
          </Link>
        </motion.div>
        {/* <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.9,
          }}
          className="relative z-10 mx-auto max-w-3xl py-4 text-center justify-center text-lg font-normal text-neutral-600 dark:text-neutral-400 mt-10"
        >
          Terrapiena è un progetto di cartografia collaborativa nato nel 2024 da un partenariato tra
          il Dipartimento di Scienze Politiche e Sociali dell’Università di Catania e il Presidio
          Partecipativo del Fiume Simeto.
        </motion.p> */}
        {/* <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <img
              //   src="https://assets.aceternity.com/pro/aceternity-landing.webp"
              src="/map.png"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div> */}
      </div>

      <section className="w-full  mx-auto px-16">
        <div className="block lg:flex justify-evenly align-center">
          <div className="flex-1 flex items-center text-black">
            <div className="block p-10 ">
              <p className="mt-5 text-xl font-bold">
                Terrapiena è un progetto di cartografia collaborativa nato nel 2024 da un
                partenariato tra il Dipartimento di Scienze Politiche e Sociali dell’Università di
                Catania e il Presidio Partecipativo del Fiume Simeto.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full  mx-auto px-16">
        <div className="block lg:flex justify-evenly align-center">
          <div className="flex-1 flex items-center text-black">
            <div className="block p-10">
              <p className="mb-5 text-xl font-bold">
                Terrapiena è finanziato da fondi europei erogati tramite il progetto Horizon
                denominato BioTraCes (Biodiversity And Transformative Change For Plural And
                Nature-Positive Societies), che mira a ripristinare la biodiversità di nove
                differenti contesti geografici in Europa, attraverso la promozione di pratiche
                innovative e trasformative messe in atto dalle comunità locali nei contesti di
                intervento.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full  mx-auto px-16">
        <div className="block lg:flex justify-evenly align-center">
          <div className="flex-1 flex items-center text-black">
            <div className="block p-10">
              <p className="mb-10 text-xl font-bold">
                Terrapiena vuole promuovere la partecipazione democratica informata e consapevole
                delle comunità locali ai processi di trasformazione territoriale innescati dalla
                costruzione di infrastrutture industriali per la produzione di energia rinnovabile.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full  mx-auto px-20">
        <div className="flex justify-center align-center overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 ">
          <img
            //   src="https://assets.aceternity.com/pro/aceternity-landing.webp"
            src="/map.png"
            alt="Landing page preview"
            className="aspect-[16/9] h-auto  object-fit w-full"
            height={1000}
            width={1000}
          />
        </div>
      </section>

      <section className="w-full  mx-auto px-16">
        <div className="block lg:flex justify-evenly align-center">
          <div className="flex-1 flex items-center text-black">
            <div className="block p-10">
              <p className="mb-5 text-xl font-bold">
                Terrapiena utilizza gli strumenti della cartografia collaborativa e della co-ricerca
                sociale in profondità, per la produzione di basi di dati georeferenziate, nonché di
                analisi dei contesti culturali e ecosistemici che includono anche il patrimonio di
                conoscenze informali delle comunità locali. Attraverso questi strumenti, Terrapiena
                si fa promotore della democratizzazione dei processi decisionali che riguardano la
                pianificazione del territorio nel contesto della transizione ecologica.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-base font-bold md:text-2xl">Aceternity UI</h1>
      </div>
      <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
        Login
      </button>
    </nav>
  )
}
