import React from 'react'
import Nav from './Nav'
import Addproduct from './Addproduct'
import { NavLink } from 'react-router-dom'
import './profile.css'

const Profile = () => {
  
  const logout =()=>{
    // setisloggedin(false)
    localStorage.removeItem('Byapartoken')
  }

  return (
    <>
    {/* <Nav/> */}
    <div className='profile'>
      <NavLink to='/addproduct' className={`navlink whitebottom`}>Add product</NavLink>
      {/* <dir>hi</dir> */}
      <NavLink to='/personallist' className={'navlink whitebottom'}>Currently added</NavLink>
      
      <NavLink to={'/'} className='navlogout navlink' onClick={logout}>Log out</NavLink>

    </div>
    </>

  )
}

export default Profile
