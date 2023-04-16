import { render, screen } from '../utils/test-utils'
import TrendingCategories from './TrendingCategories'

const trendingCategories = [
  { name: 'Action Games', slug: 'action' },
  { name: 'Sport Games', slug: 'sport' },
  { name: 'Adventure Games', slug: 'adventure' },
  { name: 'Arcade Games', slug: 'arcade' },
  { name: 'Fantasy Games', slug: 'fantasy' },
  { name: 'Strategy Games', slug: 'strategy' },
  { name: 'Shooter Games', slug: 'shooter' },
  { name: 'All Categories', slug: 'all' },
]

describe('Logo', () => {
  test('should render the categories', () => {
    render(<TrendingCategories trendingCategories={trendingCategories}/>)
  })

  expect(screen.getByText('/Trending Categories/')).toBeInTheDocument()
})
