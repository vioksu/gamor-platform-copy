import { Link } from "react-router-dom"
import SwitchTheme from "./SwitchTheme"
import { useAuth } from "../context/AuthProvider"

export default function NavigationOptions({ menu = 'desktop' }) {
  const { user, signOut } = useAuth()

  const isForMobile = menu === 'mobile'
  const isForSearch = menu === 'search'

  return (
    <ul className={ isForMobile ? 'navigation-options mobile' : 'navigation-options desktop' }>
      <li className="navigation-options__switch-theme"><SwitchTheme /></li>
      {user && (
        <div className="navigation-options__user">
          {user.email.split('@')[0]}
        </div>
      )}
      <li className="navigation-options__sign-out">
        <div className="f-icon-3">
          <svg width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M4 12a1 1 0 0 0 1 1h7.59l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76a1 1 0 0 0-.21-.33l-4-4a1 1 0 1 0-1.42 1.42l2.3 2.29H5a1 1 0 0 0-1 1ZM17 2H7a3 3 0 0 0-3 3v3a1 1 0 0 0 2 0V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3a1 1 0 0 0-2 0v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Z"></path></svg>
        </div>
      </li>
      <li className="navigation-options__sign">
        {
          user
            ? (<div className="link" onClick={signOut}>Sign out</div>)
            : (<Link to="login" className="link">Sign in</Link>)
        }
      </li>
      {!isForSearch && (
        <li className="navigation-options__create-account">
          <Link to="create-account" className="cta">Create Account</Link>
        </li>
      )}
    </ul>
  )
}
