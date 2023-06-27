import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Item from './Item'
import './nav.css'
import { NavLink,useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

  useEffect(()=>{
   
    const userinfo=async()=>{
      const a = await supe()
      if(a==false){
        setload(false)
        navigate('/login')
      }
      if(a){
        const user = a.name
        setload(false)
        setprofile(user)
        setisloggedin(true)
      }
      else{
        navigate('/login')
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
      <li><NavLink to="/" onMouseEnter={()=>dispatch(change(true))} onMouseLeave={()=>dispatch(change(false))} className='navlink navt'>Home</NavLink></li>

      <li className='navprod'><NavLink to="/products" onMouseEnter={()=>dispatch(change(true))} onMouseLeave={()=>dispatch(change(false))} className='navlink navt'>Products</NavLink>
      <div className='navprodopt'>
        <div><NavLink to={'/producttype'} className={'navlink ch'} state={'MEN'}>MEN</NavLink></div>
        <div><NavLink to={'/producttype'} className={'navlink ch'} state={'WOMEN'}>WOMEN</NavLink></div>
        <div><NavLink to={'/producttype'} className={'navlink ch'} state={'CHILDREN'}>CHILDREN</NavLink></div>
        <div><NavLink to={'/producttype'} className={'navlink ch'} state={'FOOD'}>FOOD</NavLink></div>
        </div>
      </li>
     
     </ul>
      </div>
      <div className="middlenav">
        <Search/>
      </div>
      <div className="rightnav">
       
        {
        load ? <div className="loading"></div> :
        isloggedin ?
         <div className='usernav'>
         <NavLink  to='/cart' className={'navlink cartnav'} onMouseEnter={()=>dispatch(change(true))} onMouseLeave={()=>dispatch(change(false))} title='Cart'>🛒</NavLink>
         <div to='/profile' onClick={changeshow} onMouseEnter={()=>dispatch(change(true))} onMouseLeave={()=>dispatch(change(false))} className='prof '>{profile.slice(0,4)}
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
