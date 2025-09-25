// 'use client'
// import React, { useMemo, useState } from 'react'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'

// type FilterMapProps = {
//   data: any[]
// }

// const FilterMap = ({ data }: FilterMapProps) => {
//   console.log({ data })
//   // 🔹 Stato dei filtri selezionati
//   const [filters, setFilters] = useState({
//     tipologia: '',
//     regione: '',
//     comune: '',
//     nome: '',
//     proprietario: '',
//     costruttore: '',
//     stato: '',
//     potenza: '',
//     estensione: '',
//   })

//   // 🔹 Genera opzioni dinamiche dai dati
//   const options = useMemo(() => {
//     console.log({ data })
//     return {
//       tipologia: Array.from(new Set(data.map((d) => d.tipologia))),
//       regione: Array.from(new Set(data.map((d) => d.regione))),
//       comune: Array.from(new Set(data.map((d) => d.comune))),
//       nome: Array.from(new Set(data.map((d) => d.nome))),
//       proprietario: Array.from(new Set(data.map((d) => d.proprietario))),
//       costruttore: Array.from(new Set(data.map((d) => d.costruttore))),
//       stato: Array.from(new Set(data.map((d) => d.stato))),
//       potenza: Array.from(new Set(data.map((d) => d.potenza))),
//       estensione: Array.from(new Set(data.map((d) => d.estensione))),
//     }
//   }, [data])

//   // 🔹 Cambio valore filtro
//   const handleChange = (key: keyof typeof filters, value: string) => {
//     setFilters((prev) => ({ ...prev, [key]: value }))
//   }

//   // Helper per rendere un filtro
//   const renderSelect = (key: keyof typeof filters, placeholder: string, items: string[]) => (
//     <Select value={filters[key]} onValueChange={(v) => handleChange(key, v)}>
//       <SelectTrigger className="w-[180px]">
//         <SelectValue placeholder={placeholder} />
//       </SelectTrigger>
//       <SelectContent>
//         {items.map((item) => (
//           <SelectItem key={item} value={item}>
//             {item}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   )

//   return (
//     <div className="p-6 w-full mx-auto gap-2">
//       <div className="block md:lg:xl:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 lg:gap-4 xl:gap-6">
//         {renderSelect('tipologia', 'Tipologia', options.tipologia)}
//         {renderSelect('regione', 'Regione', options.regione)}
//         {renderSelect('comune', 'Comune', options.comune)}
//         {renderSelect('nome', 'Nome', options.nome)}
//         {renderSelect('proprietario', 'Proprietario', options.proprietario)}
//         {renderSelect('costruttore', 'Costruttore', options.costruttore)}
//         {renderSelect('stato', 'Stato impianto', options.stato)}
//         {renderSelect('potenza', 'Potenza installata', options.potenza)}
//         {renderSelect('estensione', 'Estensione', options.estensione)}
//       </div>
//     </div>
//   )
// }

// export default FilterMap

// 'use client'
// import React, { useMemo } from 'react'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'

// type Filters = {
//   tipologia?: string
//   regione?: string
//   comune?: string
//   nome?: string
//   proprietario?: string
//   costruttore?: string
//   stato?: string
//   potenza?: string
//   estensione?: string
// }

// type FilterMapProps = {
//   filters: Filters
//   onFilterChange: (key: keyof Filters, value: string | undefined) => void
//   data: any[]
//   selectedArea: any
// }

// const FilterMap = ({ filters, onFilterChange, data, selectedArea }: FilterMapProps) => {
//   // 🔹 genera opzioni dinamiche
//   const regioni = useMemo(() => {
//     let set = new Set(data.map((d) => d.regione))
//     let arr = Array.from(set)

//     // se è selezionata una macro, filtra solo regioni accettate
//     if (selectedArea?.type === 'macro' && selectedArea.acceptedRegions) {
//       arr = arr.filter((r) => selectedArea.acceptedRegions.includes(r))
//     }
//     return arr
//   }, [data, selectedArea])

//   const comuni = useMemo(() => {
//     let arr = Array.from(new Set(data.map((d) => d.comune)))
//     if (filters.regione) {
//       arr = arr.filter((c) => data.find((d) => d.comune === c && d.regione === filters.regione))
//     }
//     return arr
//   }, [data, filters.regione])

//   const tipologie = useMemo(() => Array.from(new Set(data.map((d) => d.tipologia))), [data])
//   const nomi = useMemo(() => Array.from(new Set(data.map((d) => d.nome))), [data])
//   const proprietari = useMemo(() => Array.from(new Set(data.map((d) => d.proprietario))), [data])
//   const costruttori = useMemo(() => Array.from(new Set(data.map((d) => d.costruttore))), [data])
//   const stati = useMemo(() => Array.from(new Set(data.map((d) => d.stato))), [data])
//   const potenze = useMemo(() => Array.from(new Set(data.map((d) => d.potenza))), [data])
//   const estensioni = useMemo(() => Array.from(new Set(data.map((d) => d.estensione))), [data])

//   const renderSelect = (label: string, key: keyof Filters, options: string[]) => (
//     <Select value={filters[key]} onValueChange={(val) => onFilterChange(key, val)}>
//       <SelectTrigger className="w-[200px]">
//         <SelectValue placeholder={label} />
//       </SelectTrigger>
//       <SelectContent>
//         {options.map((opt) => (
//           <SelectItem key={opt} value={opt}>
//             {opt}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   )

//   return (
//     <div className="p-4 w-full mx-auto gap-2">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {renderSelect('Tipologia', 'tipologia', tipologie)}
//         {renderSelect('Regione', 'regione', regioni)}
//         {renderSelect('Comune', 'comune', comuni)}
//         {renderSelect('Nome', 'nome', nomi)}
//         {renderSelect('Proprietario', 'proprietario', proprietari)}
//         {renderSelect('Costruttore', 'costruttore', costruttori)}
//         {renderSelect('Stato impianto', 'stato', stati)}
//         {renderSelect('Potenza installata', 'potenza', potenze)}
//         {renderSelect('Estensione', 'estensione', estensioni)}
//       </div>
//     </div>
//   )
// }

// export default FilterMap

// 'use client'
// import React, { useMemo } from 'react'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'

// type Filters = {
//   tipologia?: string
//   regione?: string
//   comune?: string
//   nome?: string
//   proprietario?: string
//   costruttore?: string
//   stato?: string
//   potenza?: string
//   estensione?: string
// }

// type FilterMapProps = {
//   filters: Filters
//   onFilterChange: (key: keyof Filters, value: string | '') => void
//   data: any[]
//   selectedArea: any
// }

// const FilterMap = ({ filters, onFilterChange, data, selectedArea }: FilterMapProps) => {
//   // 🔹 Opzioni dinamiche basate su dati e area selezionata
//   const regioni = useMemo(() => {
//     let arr = Array.from(new Set(data.map((d) => d.regione)))
//     if (selectedArea?.type === 'macro' && selectedArea.acceptedRegions) {
//       arr = arr.filter((r) => selectedArea.acceptedRegions.includes(r))
//     }
//     return arr
//   }, [data, selectedArea])

//   const comuni = useMemo(() => {
//     let arr = Array.from(new Set(data.map((d) => d.comune)))
//     if (filters.regione) {
//       arr = arr.filter((c) => data.some((d) => d.comune === c && d.regione === filters.regione))
//     }
//     return arr
//   }, [data, filters.regione])

//   const tipologie = useMemo(() => Array.from(new Set(data.map((d) => d.tipologia))), [data])
//   const nomi = useMemo(() => Array.from(new Set(data.map((d) => d.nome))), [data])
//   const proprietari = useMemo(() => Array.from(new Set(data.map((d) => d.proprietario))), [data])
//   const costruttori = useMemo(() => Array.from(new Set(data.map((d) => d.costruttore))), [data])
//   const stati = useMemo(() => Array.from(new Set(data.map((d) => d.stato))), [data])
//   const potenze = useMemo(() => Array.from(new Set(data.map((d) => d.potenza))), [data])
//   const estensioni = useMemo(() => Array.from(new Set(data.map((d) => d.estensione))), [data])

//   const renderSelect = (label: string, key: keyof Filters, options: string[]) => (
//     <Select value={filters[key]} onValueChange={(val) => onFilterChange(key, val || '')}>
//       <SelectTrigger className="w-[200px]">
//         <SelectValue placeholder={label} />
//       </SelectTrigger>
//       <SelectContent>
//         {/* <SelectItem value={undefined}>Selezionza</SelectItem> */}
//         {options.map((opt) => (
//           <SelectItem key={opt} value={opt}>
//             {opt}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   )

//   return (
//     <div className="p-4 w-full mx-auto gap-2">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {renderSelect('Tipologia', 'tipologia', tipologie)}
//         {renderSelect('Regione', 'regione', regioni)}
//         {renderSelect('Comune', 'comune', comuni)}
//         {renderSelect('Nome', 'nome', nomi)}
//         {renderSelect('Proprietario', 'proprietario', proprietari)}
//         {renderSelect('Costruttore', 'costruttore', costruttori)}
//         {renderSelect('Stato impianto', 'stato', stati)}
//         {renderSelect('Potenza installata', 'potenza', potenze)}
//         {renderSelect('Estensione', 'estensione', estensioni)}
//       </div>
//     </div>
//   )
// }

// export default FilterMap

'use client'
import React, { useMemo } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Filters = {
  tipologia?: string
  regione?: string
  comune?: string
  nome?: string
  proprietario?: string
  costruttore?: string
  stato?: string
  potenza?: string
  estensione?: string
}

type FilterMapProps = {
  filters: Filters
  onFilterChange: (key: keyof Filters, value?: string) => void
  data: any[]
  selectedArea: any
}

const FilterMap = ({ filters, onFilterChange, data, selectedArea }: FilterMapProps) => {
  const getOptions = (key: keyof Filters, dependent?: keyof Filters) => {
    let arr = Array.from(new Set(data.map((d) => d[key] ?? '').filter(Boolean)))
    if (key === 'regione' && selectedArea?.type === 'macro' && selectedArea.acceptedRegions) {
      arr = arr.filter((r) => selectedArea.acceptedRegions.includes(r))
    }
    if (dependent && filters[dependent]) {
      arr = arr.filter((val) =>
        data.some((d) => d[key] === val && d[dependent] === filters[dependent]),
      )
    }
    return arr
  }

  const renderSelect = (label: string, key: keyof Filters, dependent?: keyof Filters) => {
    const options = getOptions(key, dependent)
    return (
      <Select
        value={filters[key] ?? ''}
        onValueChange={(val) => onFilterChange(key, val || undefined)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  return (
    <div className="p-4 w-full mx-auto gap-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {renderSelect('Tipologia', 'tipologia')}
        {renderSelect('Regione', 'regione')}
        {renderSelect('Comune', 'comune', 'regione')}
        {renderSelect('Nome', 'nome')}
        {renderSelect('Proprietario', 'proprietario')}
        {renderSelect('Costruttore', 'costruttore')}
        {renderSelect('Stato impianto', 'stato')}
        {renderSelect('Potenza installata', 'potenza')}
        {renderSelect('Estensione', 'estensione')}
      </div>
    </div>
  )
}

export default FilterMap
