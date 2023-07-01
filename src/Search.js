import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import './search.css'
import { NavLink, Navigate,useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { change } from './features/counter/counterSlice'
import { supe } from './Authenticated'


const Search = () => {


  const [login,setlogin]=useState(true)
  useEffect(()=>{
    const check =async()=>{
      const a = await supe()
      if(a == false){
        // //conosle.log('hi')
        setlogin(false)
      
      }
    }

    check()
  },[])




    const name = useRef()
    const [value ,setvalue]=useState('')
    const hoverd = useSelector((state)=>state.hovered.value)
  
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const set =()=>{
      const v = name.current.value
      if(v){
        setvalue(v)
      }
     
    }


    const send =(event)=>{
      if (event.key === 'Enter') {
        navigate('/searchpage', { state: value })
      }
    }
  

  return (
    <div className='search'>
      <input className='searchbar' onKeyDown={send} type="text" placeholder='search' onChange={set} ref={name} />
      <NavLink className={'navlink'} to={'/searchpage'} state={value != null&& value}>
      <button className='searchbtn' onMouseEnter={()=>dispatch(change())} onMouseLeave={()=>dispatch(change())} >🔍</button>
        </NavLink>
      {login == false && <Navigate to={'/login'}/>}

    </div>
  )
}

export default Search
