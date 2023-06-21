import React from 'react'

const Header =  {
    'Content-Type':'application/json',
    'authorization': localStorage.getItem('Byapartoken')
}

export default Header
