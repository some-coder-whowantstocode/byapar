import React, { useEffect, useState } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Nav from './Nav'
import { supe } from './Authenticated'
import { Navigate } from 'react-router-dom'
import Header from './Header'
import Item from './Item'
import './personallist.css'

const Personallist = () => {


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


   
    const [token,settoken] = useState(localStorage.getItem('Byapartoken'))
    const [products,setproducts] = useState([])
    const [load,setload]= useState('invisible')
    const [render,setrender]=useState(false)



    const url = `https://backend-9jms.onrender.com/byapar/api/v1/getbycreater`

   


    useEffect(()=>{
      if(token){
        try{
          if(token){
              const get =async()=>{
                  const data =await axios.get(url,{headers:Header})
                  // console.log(data)
                  setproducts(data.data)
              }
           get()
          }
      }catch(error){
          console.log(error)
      }
      }
      
    },[token,render])

    // useEffect(()=>{
    //     console.log(products)
    // },[products])


    const remove =async(id)=>{
      const a = await supe()
      if(a == false){
        setlogin(false)
      }
      try{
        const data ={
          id:id
        }
        // console.log(data)
        setload('visible')
        const d= await axios.post(`https://backend-9jms.onrender.com/byapar/api/v1/deleteproduct/`,data,{headers:Header})
        // console.log(d)
        settoken(localStorage.getItem('Byapartoken'))
        setload('invisible')
        render==false ? setrender(true) : setrender(false) 
      }catch(error){
        setload('invisible')
        console.log(error)
      }
     
    }
  return (
    <div>
      <Nav/>
      <div className='personallistpage'>
      {
        products.length >0 && products.map((p)=>(
            <Item key={p._id} item={p&&p}/>
        ))
      }
      </div>
        {login == false && <Navigate to={'/login'}/>}
    </div>
  )
}

export default Personallist
