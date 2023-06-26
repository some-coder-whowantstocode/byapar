import React, { useRef, useState } from 'react'
import { Navigate,NavLink } from 'react-router-dom'
import axios from 'axios'
import Url from './Url'

const Signup = () => {

    const [issignedup,setissignnedup] = useState(false)
    const [load,setload]=useState('invisible')
    const email = useRef()
    const password = useRef()
    const err = useRef()
    const name = useRef()

    const sign =async()=>{
        err.current.innerText = ''
        console.log( email.current.value)
        console.log(password.current.value)
        try{
            const n = await name.current.value
         const e = await email.current.value
         const p = await password.current.value
         const data =  {
            name:n,
           email:e,
           password:p
          }
          const headers ={
           'Content-Type':'text/json'
         }
         setload('visible')
         const login = await axios.post(`${Url}/byapar/api/v1/user/register`,data,headers)
         
         const {details} = login.data
         console.log(details)
         if(details){
          
           const token = await login.data.details.token
           localStorage.setItem('Byapartoken',"Bearer "+token)
          setload('invisible')
           setissignnedup(true)
         }
         
        }catch(error){
          setload('invisible')
         console.log(error)
         err.current.innerText = error.response.data.msg
        }
    }

  return (
    <>
       <div className='logbox'>
      <div className="logcbox">
        <div className="loguser">User signin</div>
        <div className="toplogbox">
           
        <p>user name</p>
        <input className='signname' ref={name} type="text"/>
          <p>Email</p>
        <input className='logemail' ref={email} type="email"/>
        <p>Password</p>
      <input className='logpass' ref={password} type="password"/>
        </div>

        <div className="bottomlogbox">
          <div className={`${load},"loading"`}></div>
          <p className='error' ref={err}></p>
        <button className='logsub' onClick={sign}>Sign up</button>
        </div>
        <div> 
        <NavLink to="/login" className={'navlink'}>Login</NavLink>

        </div>
   
      </div>
    {
      issignedup && <Navigate to='/' />
    }
    <div className="back">
    <NavLink to={'/'} className="navlink">✕</NavLink>

    </div>
    </div>
    </>
  )
}

export default Signup
