import React,{useEffect,useState} from 'react'
import Nav from './Nav'
import Login from './Login'
import { supe } from './Authenticated'
import { Navigate } from 'react-router-dom'


const Home = () => {

  return (
    <div>
      <Nav/>
    </div>
  )
}

export default Home
