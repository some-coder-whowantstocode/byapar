import React,{useEffect,useState} from 'react'
import Nav from './Nav'
import Login from './Login'
import { supe } from './Authenticated'
import { Navigate } from 'react-router-dom'


const Home = () => {

  const [login,setlogin]=useState(true)
  useEffect(()=>{
    const check =async()=>{
      const a = await supe()
      if(a == false){
        console.log('hi')
        setlogin(false)
      
      }
    }

    check()
  },[])
  return (
    <>
      <Nav/>
      {login == false && <Navigate to={'/login'}/>}
    </>
  )
}

export default Home
