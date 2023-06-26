import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import './login.css'
import { Navigate,NavLink } from 'react-router-dom';

const Login = () => {

    const email = useRef();
    const password = useRef();
    const err = useRef();

    const[isloggedin,setisloggedin] = useState(false)
    const[load,setLoad]=useState('invisible')
  

    const loge =async()=>{
      err.current.innerText = ''
       console.log( email.current.value)
       console.log(password.current.value)
       try{
        const e = await email.current.value
        const p = await password.current.value
        const data =  {
          email:e,
          password:p
         }
         const headers ={
          'Content-Type':'text/json'
        }
        setLoad('visible')

        const login = await axios.post('https://backend-9jms.onrender.com/byapar/api/v1/user/login',data,headers)
        const {details} = login.data
        if(details){
          const token = await login.data.details.token
          localStorage.setItem('Byapartoken',"Bearer "+token)
          setLoad('invisible')
         
          setisloggedin(true)
        }
        
       }catch(error){
        setLoad('invisible')
        console.log(error.response)
        if(error.response){
          err.current.innerText = error.response.data.msg

        }else{
          err.current.innerText = error.message
        }
       }
     
    }

    useEffect(()=>{
      console.log(load)
    
    },[load])

  return (
    <div className='logbox'>
      <div className="logcbox">
        <div className="loguser">User Login</div>
        <div className="toplogbox">
          
          <p>Email</p>
        <input className='logemail' ref={email} type="email"/>
        <p>Password</p>
      <input className='logpass' ref={password} type="password"/>
        </div>

        <div className="bottomlogbox">
       <div className={`${load} , loading`}></div>
       <p className='error' ref={err}></p>
        <button className='logsub' onClick={loge}>Login</button>
        </div>
        <div> 
        <NavLink to="/signup" className={'navlink'}>signup</NavLink>

        </div>
   
      </div>
    {
      isloggedin && <Navigate to='/' />
    }

    <div className="back">
    <NavLink to={'/'} className="navlink">✕</NavLink>

    </div>
    </div>
  )
}

export default Login
