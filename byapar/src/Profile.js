import React from 'react'
import Nav from './Nav'
import Addproduct from './Addproduct'
import { NavLink } from 'react-router-dom'
import './profile.css'

const Profile = () => {
  return (
    <>
    <Nav/>
    <div className='profile'>
      <NavLink to='/addproduct' className={`navlink`}>Add product for sell</NavLink>
      {/* <dir>hi</dir> */}
      <NavLink to='/personallist' className={'navlink'}>Currently added by user.</NavLink>
      <NavLink to='/cart' className={'navlink'}>Cart</NavLink>
    </div>
    </>

  )
}

export default Profile
