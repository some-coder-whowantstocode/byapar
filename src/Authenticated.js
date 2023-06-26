import React, { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import Url from './Url'



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
        const d = await axios.post(`${Url}/byapar/api/v1/user/auth`,data,headers)
        if(!d){
        throw Error('please check internet connection')

        }
        return d.data

       
      }catch(error){
        return false
      
      error.response?
        console.log(await error.response.data.msg)
        :
        console.log(error.message)
      }
      
}

export {
    supe,
    
}
