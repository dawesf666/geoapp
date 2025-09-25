// import React from 'react'
// import ReactEcharts from 'echarts-for-react'

// type Props = {}

// const data = [
//   {
//     name: 'Impianti foto e agro-voltaici',
//     children: [
//       {
//         name: 'Sicilia',
//         value: 15,
//         children: [
//           {
//             name: 'Catania',
//             value: 2,
//           },
//           {
//             name: 'Messina',
//             value: 5,
//           },
//           {
//             name: 'Siracusa',
//             value: 4,
//           },
//         ],
//       },
//       {
//         name: 'Lazio',
//         value: 10,
//         children: [
//           {
//             name: 'Roma',
//             value: 5,
//           },
//           {
//             name: 'Rieti',
//             value: 1,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'Giacimenti di gas',
//     children: [
//       {
//         name: 'Toscana',
//         children: [
//           {
//             name: 'Arezzo',
//             value: 1,
//           },
//           {
//             name: 'Grosseto',
//             value: 2,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'Aree Protette',
//     children: [
//       {
//         name: 'Lombardia',
//         children: [
//           {
//             name: 'Brescia',
//             value: 1,
//           },
//           {
//             name: 'Varese',
//             value: 2,
//           },
//         ],
//       },
//     ],
//   },
// ]
// const Sumburst = (props: Props) => {
//   const option = {
//     series: {
//       type: 'sunburst',
//       //data: returnDistribution(mine, other),
//       data: data,
//       radius: [0, '90%'],
//       label: {
//         rotate: false,
//       },
//     },
//   }

//   return <ReactEcharts option={option} style={{ height: 600, width: 600 }} />
// }

// export default Sumburst

// Sumburst.tsx
'use client'
import React, { useMemo } from 'react'
import ReactEcharts from 'echarts-for-react'

type SunburstLeaf = { name: string; value?: number }
type SunburstNode = { name: string; value?: number; children?: SunburstNode[] }
type Props = {
  /** Hierarchy: Tipologia -> Regione -> Comune */
  data: SunburstNode[] | undefined
  /** Optional: px height (defaults 600) */
  height?: number | string
  /** Optional: px/percent width (defaults '100%') */
  width?: number | string
}

const Sumburst: React.FC<Props> = ({ data, height = 600, width = '100%' }) => {
  const hasData = Array.isArray(data) && data.length > 0

  const option = useMemo(() => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: (p: any) => {
          const path = p.treePathInfo?.map((x: any) => x.name).filter(Boolean) || []
          const label = path.join(' / ')
          const val = typeof p.value === 'number' ? p.value : ''
          return `<div><strong>${label}</strong>${val !== '' ? `: ${val}` : ''}</div>`
        },
      },
      series: [
        {
          type: 'sunburst',
          data: hasData ? data : [],
          radius: [0, '90%'],
          sort: undefined, // keep input order
          nodeClick: 'zoomToNode', // click to zoom into a branch
          emphasis: { focus: 'ancestor' },
          label: {
            rotate: 0,
            overflow: 'truncate',
            minAngle: 6, // show labels only if slice is big enough
          },
          levels: [
            // root (invisible)
            {},
            // level 1: Tipologia
            {
              r0: '0%',
              r: '33%',
              label: { fontSize: 12, color: '#222' },
              itemStyle: { borderWidth: 1 },
            },
            // level 2: Regione
            {
              r0: '33%',
              r: '66%',
              label: { fontSize: 11 },
              itemStyle: { borderWidth: 1 },
            },
            // level 3: Comune
            {
              r0: '66%',
              r: '90%',
              label: { fontSize: 10 },
              itemStyle: { borderWidth: 1 },
            },
          ],
        },
      ],
    }
  }, [data, hasData])

  if (!hasData) {
    return (
      <div
        className="flex items-center justify-center text-sm text-muted-foreground"
        style={{ height, width }}
      >
        Nessun dato disponibile per il sunburst
      </div>
    )
  }

  return <ReactEcharts option={option} style={{ height, width }} />
}

export default Sumburst
