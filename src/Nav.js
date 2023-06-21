import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Item from './Item'
import './nav.css'
import { NavLink } from 'react-router-dom'
import {supe} from './Authenticated'
import Search from './Search'
import { useSelector,useDispatch } from 'react-redux'
import { change } from './features/counter/counterSlice'
import Profile from './Profile'

const Nav = () => {
  const [profile,setprofile] = useState()
  const [isloggedin,setisloggedin] = useState(false)
  const [load,setload]=useState(localStorage.getItem('Byapartoken')?true:false)
  const [visibility,setvisiblity] = useState('invisible')

  const hoverd = useSelector((state)=>state.hovered.value)
  
  const dispatch = useDispatch()

  useEffect(()=>{
   
    const userinfo=async()=>{
      const a = await supe()
      if(a){
        const user = a.name
        setload(false)
        setprofile(user)
        setisloggedin(true)
      }
     
    }
    userinfo()
  },[])
 

  const changeshow =()=>{
    let a;
    visibility == 'invisible'?
    a = 'visible' :
    a = 'invisible'
    setvisiblity(a)
  }

  return (
    <div className='navbar'>
      <div className="leftnav">
      <ul>
      <li><NavLink to="/" onMouseEnter={()=>dispatch(change(true))} onMouseLeave={()=>dispatch(change(false))} className='navlink navhome'>Home</NavLink></li>

      <li className='navprod'><NavLink to="/products" onMouseEnter={()=>dispatch(change(true))} onMouseLeave={()=>dispatch(change(false))} className='navlink'>Products</NavLink>
      <div className='navprodopt'>
        <li><NavLink to={'/producttype'} className={'navlink'} state={'MEN'}>MEN</NavLink></li>
        <li><NavLink to={'/producttype'} className={'navlink'} state={'WOMEN'}>WOMEN</NavLink></li>
        <li><NavLink to={'/producttype'} className={'navlink'} state={'CHILDREN'}>CHILDREN</NavLink></li>
        <li><NavLink to={'/producttype'} className={'navlink'} state={'FOOD'}>FOOD</NavLink></li>
        </div>
      </li>
     
     </ul>
      </div>
      <div className="middlenav">
        <Search/>
      </div>
      <div className="rightnav">
       
        {load ? <div className="loading"></div> :
        isloggedin ?
         <div className='usernav'>
         <NavLink  to='/cart' className={'navlink cartnav'} onMouseEnter={()=>dispatch(change(true))} onMouseLeave={()=>dispatch(change(false))} title='Cart'>🛒</NavLink>
         <div to='/profile' onClick={changeshow} onMouseEnter={()=>dispatch(change(true))} onMouseLeave={()=>dispatch(change(false))} className='prof '>{profile}
         <div className={`navprof ${visibility}`}>
         <Profile/>
         </div>
         </div>  
         </div>
        
      : 
      <>
         <NavLink className='navlink' to='/login'>
        <div className="navlogin" onMouseEnter={()=>dispatch(change(true))} onMouseLeave={()=>dispatch(change(false))}>Login</div>
        </NavLink>
        <NavLink className='navlink' to='/signup'>
        <div className="navsignup" onMouseEnter={()=>dispatch(change(true))} onMouseLeave={()=>dispatch(change(false))}>Sign Up</div>
        </NavLink>
      </> 
    }
       
      </div>
  
    </div>
  )
}

export default Nav
