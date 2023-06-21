import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from './Nav'
import axios from 'axios'
import Header from './Header'
import Item from './Item'

const Producttype = () => {
    const location = useLocation()
    const [type,settype] = useState('')
    const [product,setproduct] = useState([])
    useEffect(()=>{
        console.log(location.state)
        settype(location.state)
    },[location])


    const url = `https://backend-9jms.onrender.com/byapar/api/v1/search?ptype=${type}`

    useEffect(()=>{
      if(type != ''){
        try{
          const getdata = async()=>{
            const data =await axios.get(url,{headers: Header})
            console.log(data)
            setproduct(data.data)
          }
       getdata()
        }catch(error){
          if(error.response){
            console.log(error.response)
          }else{
            console.log(error.message)
          }
        }
      }
    },[type])


  return (
    <div>
      <Nav/>
      <div className='pbox'>
      
        {
          product.length>0 ?
           product.map((item)=>(
            <Item item={item}/>
            
          ))
          :
          <div>No items available currently, try adding some .</div>
        }
      </div>
    </div>
  )
}

export default Producttype
