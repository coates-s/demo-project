// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import UserContext from '../../UserContext'


const Header = () => {
  const {authUser, actions} = useContext(UserContext);
  const handleLogin = ()=>{
    actions.signIn();
  }
  const handleLogout = ()=>{
    actions.signOut();
  }
  return (
    <header>
      <img /><h1>News!</h1>
      <p>Democracy dies in Darkness! Yippee!</p>
    <nav>
      <ul>
       <li><NavLink to="/">Home</NavLink></li>
       <li><NavLink to="/technology">Technology</NavLink></li>
       <li><NavLink to="/about">About</NavLink></li>
       {authUser&&<li><NavLink to="/add">Write Article</NavLink></li>}
      </ul>
    </nav>  
    {!authUser? <button onClick={handleLogin}>Login</button>:
    <button onClick={handleLogout}>Logout</button>}
  </header>
  )
}

export default Header
