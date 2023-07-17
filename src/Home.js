import React,{useEffect,useState} from 'react'
import Nav from './Nav'
import Login from './Login'
import { supe } from './Authenticated'
import { Navigate } from 'react-router-dom'
import Products from './Products'


const Home = () => {

  return (
    <div>
      {/* <Nav/> */}
      <Products/>
    </div>
  )
}

export default Home
