import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import './product.css'
import { supe } from './Authenticated'
import { Navigate } from 'react-router-dom'

const Products = () => {

    const [products,setproducts] = useState([])
    const [load,setload] = useState('invisible')
  

    const url = 'https://backend-9jms.onrender.com/byapar/api/v1/getallproducts'
    const headers ={
      'Content-Type':'application/json',
      'authorization': localStorage.getItem('Byapartoken')
    }
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
             d =await axios.get(url,{headers:headers})
          }catch(error){
            console.log(error)
          }
           d && setproducts(d.data)
            // console.log(d)
        }
    
        getproduct()
        
         
    },[])
   

    const addtocart =async(id,price,name,image)=>{
      const data ={
        productid:id.toString(),
        price:price,
        name:name,
        image:image
      }
      console.log(data)
      try{
        setload('visible')
        const d =await axios.post(`https://backend-9jms.onrender.com/byapar/api/v1/addtocart/:${id}`,data,{headers:headers})
        console.log(d)
        setload('invisible')
      }catch(error){
        setload('invisible')
        console.log(error)
      }

      console.log(id)
    }


  return (
    <div>
      <Nav/>
      {
        products.length >0 && products.map((p)=>(
            <div key={p._id} className='product'>
            <div className='bigleftproduct'>
            <div className="leftproduct">
                <img src={p.image} className='productimage' alt="" />

                </div>
             
                <div className="rightproduct">
                <div>{p.name}</div> 
                <div>{p.description}</div>
                <div>{p.price}</div>
                </div>
            </div>
              
               {load == 'invisible' ?
               <div className="middleproduct" onClick={()=>addtocart(p._id,p.price,p.name,p.image)} title='Add to cart'>📃</div>
               :
               <div className={`${load} , loading`}></div>
               } 
               
            </div> 

        ))
      }
      {login == false && <Navigate to={'/login'}/>}
    </div>
  )
}

export default Products
