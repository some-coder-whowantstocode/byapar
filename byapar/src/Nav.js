import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Item from './Item'
import './nav.css'

const Nav = () => {


  return (
    <div className='navbar'>
     <ul>
      <li>MEN</li>
      <li>WOMEN</li>
      <li>KIDS</li>
      <li>HOME&LIVING</li>
      <li>BEAUTY</li>
     </ul>
    </div>
  )
}

export default Nav
