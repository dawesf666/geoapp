import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import Map from '@/components/Custom/Map/MapBody'
import HomePage from '@/components/Custom/HomeSec/HomeSec'
import { AboutHero } from '@/components/Custom/AboutHero/AboutHero'
import { Payload } from 'payload'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {slug === 'map' && (
        <div className="w-full   ">
          <RenderHero {...hero} />
          <RenderBlocks blocks={layout} />
          <div className="mx-auto px-4 lg:px-16">
            <h2 className=" text-3xl font-bold mb-4">Consulta la mappa</h2>
            <Map />
          </div>
        </div>
      )}

      {slug === 'home' && (
        <>
          <RenderHero {...hero} />
          {/* <RenderBlocks blocks={layout} /> */}
          <div className="mt-20">
            {/* <RenderHero {...hero} /> */}
            <HomePage />
          </div>
        </>
      )}
      {slug === 'about' && (
        <>
          <div className="">
            <AboutHero />
          </div>
        </>
      )}
      {slug === 'blog' && (
        <>
          <RenderHero {...hero} />
          <div className=" my-12">
            <RenderBlocks blocks={layout} />
          </div>
        </>
      )}
      {slug === 'segnala' && (
        <>
          <RenderHero {...hero} />
          <RenderBlocks blocks={layout} />
        </>
      )}
      {slug === 'progetti' && (
        <>
          <RenderBlocks blocks={layout} />
        </>
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
