import Logo from "./Logo"
import NavigationMenu from "./NavigationMenu"
import NavigationOptions from "./NavigationOptions"

export default function Navigation() {

  return (
    <div className="navigation container">
      <NavigationMenu />
      <Logo />
      <NavigationOptions />
    </div>
  )
}
