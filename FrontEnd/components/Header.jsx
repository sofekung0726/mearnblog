import React from 'react'
import { useEffect , useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <header>
        <Link to={"./"} className="logo">
            SE NPRU blog
        </Link>
        
        <nav>
        <Link to ={"./create"} > Add </Link>
            <Link to = {"./login"} > Login</Link>
            <Link to = {"./register"} > Register</Link>
        </nav>
    </header>
  )
}

export default Header