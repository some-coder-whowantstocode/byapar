import React,{useEffect,useState} from 'react'
import Nav from './Nav'
import Login from './Login'
import { supe } from './Authenticated'
import { Navigate } from 'react-router-dom'
import Cursor from './Cursor'


const Home = () => {

  return (
    <>
      <Nav/>
   {/* <Cursor/> */}
    </>
  )
}

export default Home
