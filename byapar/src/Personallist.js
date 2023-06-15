import React, { useEffect, useState } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Nav from './Nav'
import { supe } from './Authenticated'
import { Navigate } from 'react-router-dom'

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

    const headers ={
        'Content-Type':'application/json',
        'authorization': `${token}`
      }


    useEffect(()=>{
      if(token){
        try{
          if(token){
              const get =async()=>{
                  const data =await axios.get(url,{headers:headers})
                  console.log(data)
                  setproducts(data.data)
              }
           get()
          }
      }catch(error){
          console.log(error)
      }
      }
      
    },[token,render])

    useEffect(()=>{
        console.log(products)
    },[products])


    const remove =async(id)=>{
      try{
        const data ={
          id:id
        }
        console.log(data)
        setload('visible')
        const d= await axios.post(`https://backend-9jms.onrender.com/byapar/api/v1/deleteproduct/`,data,{headers:headers})
        console.log(d)
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
                <div className="middleproduct" onClick={()=>remove(p._id)} title='Add to cart'>❌</div>
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

export default Personallist
