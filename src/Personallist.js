import React, { useEffect, useState } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Nav from './Nav'
import { supe } from './Authenticated'
import { Navigate } from 'react-router-dom'
import Header from './Header'
import Item from './Item'
import './personallist.css'
import Url from './Url'
import { isVisible } from '@testing-library/user-event/dist/utils'

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
    const [image,setimage] = useState([]);
    const [render,setrender]=useState(false)



    const url = `${Url}/byapar/api/v1/getbycreater`

   


    useEffect(()=>{
      if(token){
        try{
          if(token){
              const get =async()=>{
                setload('visible')
                  const data =await axios.get(url,{headers:Header})
                  console.log(data)
                  setimage(data.data.grids)
                  setproducts(data.data.product)
                  setload('invisible')
              }
           get()
          }
      }catch(error){
        setload('invisible')
          console.log(error)
      }
      }
      
    },[token,render])

    // useEffect(()=>{
    //     console.log(products)
    // },[products])


    const remove =async(id)=>{
      const a = await supe()
      console.log('hi')
      if(a == false){
        setlogin(false)
      }
      try{
        const data ={
          id:id
        }
        // console.log(data)
       
        const d= await axios.post(`${Url}/byapar/api/v1/deleteproduct/`,data,{headers:Header})
        // console.log(d)
        settoken(localStorage.getItem('Byapartoken'))
       
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
        load == 'visible' ?
        <div className="loading"></div>
        :
        
          products.length >0 && products.map((p)=>(
            <div>
 <Item key={p._id} item={p&&p} image={image && image.filter((image) => image._id==p.gridid)}/>
 <span className='del' onClick={()=>remove(p._id)}>remove</span>
            </div>
             
          ))
        
      }
   
      </div>
        {login == false && <Navigate to={'/login'}/>}
    </div>
  )
}

export default Personallist
