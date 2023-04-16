import { Store } from 'pullstate'
import { ICategoryStore } from '../types'

export const CategoryStore = new Store<ICategoryStore>({
  trendingCategories: [
    { name: 'Action Games', slug: 'action' },
    { name: 'Sport Games', slug: 'sport' },
    { name: 'Adventure Games', slug: 'adventure' },
    { name: 'Arcade Games', slug: 'arcade' },
    { name: 'Fantasy Games', slug: 'fantasy' },
    { name: 'Strategy Games', slug: 'strategy' },
    { name: 'Shooter Games', slug: 'shooter' },
    { name: 'All Categories', slug: 'all' },
  ]
})
