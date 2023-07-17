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
    const [gridfs,setgridfs] = useState([])
    const [load,setload] = useState('invisible')
  

  
   
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

    const url = `${Url}/byapar/api/v1/getallproducts`
    useEffect(()=>{
      
    
       
        const getproduct  = async()=>{
          let d;
          try{
            setload('visible')
             d =await axios.get(url,{headers:Header})
             console.log(d)
            if(d.data){
              
              setproducts(d.data.products);
              setgridfs(d.data.grids);
            }
            setload('invisible')
          }catch(error){
            console.log(error)
          }
          //conosle.log(d)
           
        }
    
        getproduct()
        
         
    },[])
   

 


  return (
    <div>
      <Nav/>
      <div className='pbox'>
      {
        load == 'visible'?
        <div className='loading'></div>
        :
        Array.isArray(products) &&products.length >0&& products.map((p)=>(

              <Item key={p._id} item={p} image={
              gridfs && gridfs.find((grid)=>grid._id == p.gridid)
              }/>
            
               

        ))
      }
      </div>
      {login == false && <Navigate to={'/login'}/>}
    </div>
  )
}

export default Products
