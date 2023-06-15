import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Item from './Item'
import './nav.css'
import { NavLink } from 'react-router-dom'
import {supe} from './Authenticated'

const Nav = () => {
  const [profile,setprofile] = useState()
  const [isloggedin,setisloggedin] = useState(false)
  const [load,setload]=useState(localStorage.getItem('Byapartoken')?true:false)


  useEffect(()=>{
   
    const userinfo=async()=>{
      const a = await supe()
      if(a){
        const user = a.name
        setprofile(user)
        setisloggedin(true)
        setload(false)
      }
     
    }
    userinfo()
  },[])
 

  const logout =()=>{
    setisloggedin(false)
    localStorage.removeItem('Byapartoken')
  }

  return (
    <div className='navbar'>
      <div className="leftnav">
      <ul>
      <li><NavLink to="/" className='navlink'>Home</NavLink></li>

      <li><NavLink to="/products" className='navlink'>Products</NavLink></li>
     
     </ul>
      </div>
      <div className="rightnav">
       
        {load ? <div className="loading"></div> :
        isloggedin ?
         <>
         <NavLink to='/profile' className='prof navlink'>{profile}</NavLink>  
        <div className='navlogout' onClick={logout}>Log out</div>
         </>
        
      : 
      <>
         <NavLink className='navlink' to='/login'>
        <div className="navlogin">Login</div>
        </NavLink>
        <NavLink className='navlink' to='/signup'>
        <div className="navsignup">Sign Up</div>
        </NavLink>
      </> 
    }
       
      </div>
  
    </div>
  )
}

export default Nav
