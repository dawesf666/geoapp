import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InfiniteMovingCards } from '../InfiniteMovingCards/InfiniteMovingCards'
import { title } from 'process'
import { InfiniteLogoScroller } from '../InfiniteMovingCards/InfiniteLogoScroller'
import { getPayload, Payload } from 'payload'
const partners = [
  {
    name: 'Nesti Impresa sociale',
    logo: '/nesti.png',
    url: 'https://www.nestimpresasociale.com/wp-content/uploads/2023/12/cropped-NESTI_variante_03_bianco-1-1.png',
    quote: '',
    title: 'Nesti Impresa sociale',
  },
  {
    name: 'Università di Catania',
    logo: '/unict.svg',
    url: 'https://www.unict.it/sites/all/themes/id_theme_unict/logo.svg',
    quote: "L'Università di Catania è un centro di eccellenza nella ricerca e nell'innovazione.",
    title: 'Università di Catania',
  },
  {
    name: 'Università di Helsinki',
    logo: '/partners/unihki.png',
    url: 'https://www.helsinki.fi/en',
    quote:
      "L'Università di Helsinki è un centro di ricerca di fama mondiale, impegnata nella sostenibilità e nell'innovazione.",
    title: 'Università di Helsinki',
  },
  {
    name: 'Università di Utrecht',
    logo: '/partners/utrecht.png',
    url: 'https://www.uu.nl/en',
    quote:
      "L'Università di Utrecht è una delle principali università di ricerca nei Paesi Bassi, con un forte focus sulla sostenibilità.",
    title: 'Università di Utrecht',
  },
]

export default async function HomePage() {
  const getPosts = async (payload: Payload) => {
    const posts = await payload.find({
      collection: 'posts',
      // select: {
      //   text: true,
      //   //select a specific field from group
      //   group: {
      //     number: true,
      //   },
      //   //select all fields from array
      //   array: true,
      // },
    })

    return posts
  }
  const post = await getPosts(await getPayload({ config: 'post' }))
  console.log('post', post)
  return (
    // <main>
    //   <section className="max-w-4xl mx-auto space-y-6 w-full">
    //     <h1 className="text-4xl font-bold">Mappa della Transizione Ecologica</h1>

    //     <div className="flex flex-col-2 w-full">
    //       <div className="flex-1">
    //         <Image
    //           src="/alt.jpg"
    //           alt="none"
    //           className="w-full h-auto max-w-[600px]"
    //           width={1000}
    //           height={800}
    //         />
    //       </div>

    //       <p className="flex-1 flex items-center">
    //         La mappa è intesa come strumento cartografico digitale pubblico, finalizzato a fornire
    //         informazioni georeferenziate circa l’impatto della transizione ecologica in Sicilia. In
    //         particolare, la mappa renderà accessibili una gamma di informazioni vasta, direttamente
    //         e indirettamente correlata agli impianti fotovoltaici di scala industriale localizzati
    //         nella Valle del Simeto. Grazie a queste informazioni, e alle relazioni tra loro, la
    //         mappa produrrà impatto sui tre diversi fronti della ricerca, delle politiche locali e
    //         della partecipazione democratica a livello territoriale.
    //       </p>
    //     </div>
    //   </section>
    // </main>
    <main className="min-h-screen bg-white text-black space-y-10 ">
      {/* Sezione 1 - Descrizione generale */}
      <section className="w-full  mx-auto px-4 lg:px-16">
        <div className="block lg:flex justify-evenly align-center bg-[#0f4c82]">
          <div className="flex-1">
            <Image src="/alt.jpg" alt="none" className="w-full h-auto " width={800} height={700} />
          </div>
          <div className="flex-1 flex items-center text-white">
            <div className="block p-10">
              <h1 className="flex justify-center text-4xl font-bold mb-10">
                Mappa della Transizione Ecologica
              </h1>
              <p className="mb-10 text-xl font-bold">
                La mappa è intesa come strumento cartografico digitale pubblico, finalizzato a
                fornire informazioni georeferenziate circa l’impatto della transizione ecologica in
                Sicilia. In particolare, la mappa renderà accessibili una gamma di informazioni
                vasta, direttamente e indirettamente correlata agli impianti fotovoltaici di scala
                industriale localizzati nella Valle del Simeto. Grazie a queste informazioni, e alle
                relazioni tra loro, la mappa produrrà impatto sui tre diversi fronti della ricerca,
                delle politiche locali e della partecipazione democratica a livello territoriale.
              </p>
              <p className="mb-10 text-xl font-bold">
                La mappa è finanziata dal progetto HORIZON UE denominato Biodiversity And
                Transformative Change For Plural And Nature-Positive Societies (da ora in avanti:
                BIOTraces). Il progetto è implementato da un consorzio composto da nove enti di
                ricerca europei. L’università di Catania è membro del consorzio di ricerca di
                BIOTraces, tramite il Dipartimento di Scienze Politiche e Sociali .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 2 - Info progetto BIOTraces */}
      <section className="w-full  mx-auto px-4 lg:px-16">
        <div className="block lg:flex justify-evenly align-center bg-[#046a38]">
          <div className="flex-1 items-center text-white">
            <div className="block p-10 ">
              <h1 className="flex justify-center text-4xl font-bold mb-10">
                Il progetto BIOTraces
              </h1>
              <p className="mb-10 text-xl font-bold">
                BioTraCes mira a co-produrre approcci e strategie innovative che contribuiscano a
                ripristinare la biodiversità in Europa. Sviluppando una teoria del cambiamento
                trasformativo (ToTC), il progetto migliorerà la comprensione del ruolo fondamentale
                svolto da valori culturali, dinamiche di potere e atteggiamenti sociali nelle sfide
                connesse alla biodiversità, al fine di minimizzare i fattori (diretti e indiretti)
                che portano al suo declino. Questo obiettivo sarà raggiunto facendo leva su quattro
                principi trasversali: pluralizzazione, responsabilizzazione, politicizzazione e
                radicamento. Impegnandosi in iniziative di trasformazione in settori ad alto impatto
                sulla biodiversità (agricoltura e alimentazione, silvicoltura, risorse acquatiche e
                urbanizzazione) in nove casi studio condotti negli Stati membri di tutta Europa e
                istituendo un Influencer and Stakeholder Board, il progetto favorisce la diffusione
                delle conoscenze e delle innovazioni sperimentate presso le sedi politiche
                competenti a livello europeo (Commissione europea i.r.t. Green Deal, Farm to Fork e
                Biodiversity Strategy) e nelle interfacce che mettono in dialogo scienza e politica
                sui temi della biodiversità a livello globale (ad esempio, IPBES, IPCC).
              </p>
            </div>
          </div>
          <div className="flex-1 flex ">
            <Image src="/alt.jpg" alt="none" className="w-full h-auto " width={800} height={700} />
          </div>
        </div>
      </section>

      {/* Sezione 3 - Navigazione a Blog e Mappa */}
      <section className="w-full mx-auto flex flex-col md:flex-row gap-10 justify-center px-4 lg:px-16">
        {/* Blog */}
        <div className="bg-black text-white rounded-2xl p-6 shadow-md w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Contribuisci attivamente</h3>
            <p>
              Grazie al tuo contributo possiamo fare la differenza, segnalando tutte quelle
              situazioni che impattano il nostro territorio.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/segnala">
              <Button
                variant="outline"
                className="text-black border-white hover:text-lime-600 focus:text-white transition-transform duration-200 ease-in-out hover:[transform:scale(1.2)]"
              >
                Segnala
              </Button>
            </Link>
          </div>
        </div>

        {/* Mappa */}
        <div className="relative rounded-2xl overflow-hidden shadow-md w-full md:w-1/2">
          <Image
            src="/map.png"
            alt="Mappa della Valle del Simeto"
            width={800}
            height={600}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-4 right-4">
            <Link href="/map">
              <Button
                variant="default"
                //className="bg-white text-black hover:bg-black hover:text-white"
                className="bg-white text-black hover:text-lime-600 focus:text-white transition-transform duration-200 ease-in-out hover:[transform:scale(1.2)]"
              >
                Esplora la Mappa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sezione 4 - News */}
      <section className="w-full mx-auto px-4 lg:px-16 ">
        <div className="rounded-2xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">
          {post?.docs && post.docs.length > 0 ? (
            // post?.doc?.map((po, key) => (
            //   <div key={key} className="flex text-black">
            //     <p className="text-black">{po?.title}</p>
            //   </div>
            // ))
            <InfiniteMovingCards
              items={post.docs.map((doc) => ({
                name: doc.title,
                quote: doc.text,
                title: doc.group?.number || 'Post',
                logo: doc.heroImage,
              }))}
              speed="normal"
              //start={true}
              pauseOnHover={true}
            />
          ) : (
            <p className="text-black">Nessun post disponibile al momento.</p>
          )}
        </div>
      </section>

      <div className="">
        <div className="bg-black text-white p-6 flex justify-center align-center text-4xl font-bold">
          I nostri partner
        </div>
        <InfiniteLogoScroller
          logos={[
            // 'https://www.nestimpresasociale.com/wp-content/uploads/2023/12/cropped-NESTI_variante_03_bianco-1-1.png',
            // 'https://www.unict.it/sites/all/themes/id_theme_unict/logo.svg',
            '/nesti.png',
            '/unict.svg',
            '/biotraces.png',
          ]}
          direction="left"
          speed="fast"
          pauseOnHover
          className="border-y border-gray-200 dark:border-zinc-700 bg-black w-full"
        />
      </div>
    </main>
  )
}
