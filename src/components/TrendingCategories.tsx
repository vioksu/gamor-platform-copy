import Category from './Category'
import { CategoryType } from '../types'

type PropsType = {
  trendingCategories: CategoryType[]
}

const TrendingCategories = ({ trendingCategories }: PropsType) => {
  return (
    <section className='trending-categories container'>
      <h2>Trending Categories</h2>
      <div className='trending-categories__list space-outer-2'>
        {trendingCategories.map((c, index) => (
          <Category key={`category-${index}`} index={index} category={c} />
        ))}
      </div>
    </section>
  )
}

export default TrendingCategories
