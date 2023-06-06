import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <nav>
        <NavLink to='/dashboard'>Customer Dashboard </NavLink>
        <NavLink to='/dashboard2'>Tradesmen Dashboard </NavLink>
        <NavLink to='/profile'>Profile </NavLink>
    </nav>
  )
}

export default Header