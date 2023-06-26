import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import './product.css'
import { supe } from './Authenticated'
import { Navigate } from 'react-router-dom'
import Header from './Header'
import Item from './Item'
import Url from './Url'

const Products = () => {

    const [products,setproducts] = useState([])
  

    const url = `${Url}/byapar/api/v1/getallproducts`
   
    const [login,setlogin]=useState(true)
    useEffect(()=>{
      const check =async()=>{
        const a = await supe()
        if(a == false){
          // //conosle.log('hi')
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
          //conosle.log(d)
           d.data && setproducts(d.data)
           
        }
    
        getproduct()
        
         
    },[])
   

 


  return (
    <div>
      <Nav/>
      <div className='pbox'>
      {
        products.length >0 && products.map((p)=>(

              <Item key={p._id} item={p}/>
            
               

        ))
      }
      </div>
      {login == false && <Navigate to={'/login'}/>}
    </div>
  )
}

export default Products
