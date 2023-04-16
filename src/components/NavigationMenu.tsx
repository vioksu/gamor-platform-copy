import { Link, NavLink } from "react-router-dom"
import MobileNavigation from "./MobileNavigation"

export default function NavigationMenu() {
  return (
    <div>
      <MobileNavigation />
      <ul className="navigation__menu">
        <li>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isActive
                ? "active"
                : isPending
                ? "pending"
                : ""
            }
          >
            Home
          </NavLink>
        </li>
        <li><Link to="/stream">Stream</Link></li>
        <li><Link to="/party">Party</Link></li>
        <li><Link to="/premium">Premium</Link></li>
      </ul>
    </div>
  )
}
