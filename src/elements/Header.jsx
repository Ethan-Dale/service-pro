import { NavLink } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import AuthContext from "../store/authContext"


const Header = () => {
  const {userId, logout} = useContext(AuthContext)



  return (
    userId ? (
      <nav>
          <NavLink to='/dashboard'>Customer Dashboard </NavLink>
          <NavLink to='/dashboard2'>Tradesmen Dashboard </NavLink>
          <NavLink to='/profile'>Profile </NavLink>
          <button onClick={logout}>Logout</button>
      </nav>
    ) : null

    ) 
}

export default Header