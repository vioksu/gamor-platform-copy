import { Link } from "react-router-dom"
import { CategoryType } from "../types"

type PropsType = {
  category: CategoryType,
  index: number
}

const Category = ({ category, index }: PropsType) => {
  return (
    <Link to={`/${category.slug}`} className="category">
      <span className="category__number">{index.toString().padStart(2, '0')}</span>
      <h4>{ category.name }</h4>
      <div className="f-icon-2">
        <svg width="100%" height="100%" viewBox="0 0 24 24"><path d="M19 12l-7-6v5H6v2h6v5z" fill="currentColor"></path></svg>
      </div>
    </Link>
  )
}

export default Category
