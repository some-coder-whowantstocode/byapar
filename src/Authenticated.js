import React, { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'



const supe =async()=>{
  if(!localStorage.getItem('Byapartoken')){
    return false
  }
    const data =  {
        token:localStorage.getItem('Byapartoken')
       }
       const headers ={
        'Content-Type':'text/json'
      }
      try{
        const d = await axios.post('https://backend-9jms.onrender.com/byapar/api/v1/user/auth',data,headers)
        if(!d){
        throw Error('please check internet connection')

        }
        return d.data

       
      }catch(error){
      error.response?
        console.log(await error.response.data.msg)
        :
        console.log(error.message)
       
      }
      
}

export {
    supe,
    
}
