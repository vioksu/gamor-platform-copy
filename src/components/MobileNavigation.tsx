import { NavLink } from "react-router-dom"
import NavigationOptions from "./NavigationOptions"

export default function MobileNavigation() {
  return (
    <div className="mobile-navigation">
      <input id="mobile-navigation-toggle" type="checkbox" className="mobile-navigation__checkbox" />

      <label htmlFor="mobile-navigation-toggle" className="mobile-navigation__button">
        <div className="mobile-navigation__menu menu f-icon-4">
          <svg width="100%" height="100%" viewBox="-5 -7 24 24"><path fill="currentColor" d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2zm7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2zM1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z"></path></svg>
        </div>
        <div className="mobile-navigation__close close f-icon-4">
          <svg width="100%" height="100%" viewBox="0 0 32 32"><path fill="currentColor" d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"></path></svg>
        </div>
      </label>

      <div className="mobile-navigation__background">
        &nbsp;
      </div>

      <nav className="mobile-navigation__nav">
        <ul className="mobile-navigation__list">
          <li className="mobile-navigation__item">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isActive
                  ? "mobile-navigation__link active"
                  : isPending
                  ? "mobile-navigation__link pending"
                  : "mobile-navigation__link"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="mobile-navigation__item">
            <NavLink to="/streams" className="mobile-navigation__link">
              Streams
            </NavLink>
          </li>
          <li className="mobile-navigation__item">
            <NavLink to="/party" className="mobile-navigation__link">
              Party
            </NavLink>
          </li>
          <li className="mobile-navigation__item">
            <NavLink to="/premium" className="mobile-navigation__link">
              Premium
            </NavLink>
          </li>
        </ul>
        <NavigationOptions menu="mobile"/>
      </nav>
    </div>
  )
}
