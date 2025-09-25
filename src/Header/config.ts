import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
// import Users from '../collections/Users'
// import Posts from '../collections/Posts';
// import Categories from '../collections/Categories';
export const Header: GlobalConfig = {
  //collections:[Users,Posts,Categories],
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
      
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
