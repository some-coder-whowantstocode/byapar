import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import './product.css'
import { supe } from './Authenticated'
import { Navigate } from 'react-router-dom'
import Header from './Header'
import Item from './Item'

const Products = () => {

    const [products,setproducts] = useState([])
  

    const url = 'https://backend-9jms.onrender.com/byapar/api/v1/getallproducts'
   
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

   
    useEffect(()=>{
      
    
       
        const getproduct  = async()=>{
          let d;
          try{
             d =await axios.get(url,{headers:Header})
          }catch(error){
            console.log(error)
          }
           d && setproducts(d.data)
           
        }
    
        getproduct()
        
         
    },[])
   

 


  return (
    <div>
      <Nav/>
      <div className='pbox'>
      {
        products.length >0 && products.map((p)=>(

              <Item item={p}/>
            
               

        ))
      }
      </div>
      {login == false && <Navigate to={'/login'}/>}
      {/* <Cursor/> */}
    </div>
  )
}

export default Products
