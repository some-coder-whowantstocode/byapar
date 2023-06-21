import React, { useEffect, useState } from 'react'
import './cart.css'
import Nav from './Nav'
import axios from 'axios'
import { supe } from './Authenticated'
import { Navigate } from 'react-router-dom'
import Header from './Header'

const Cart = () => {


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



    const [cartitem,setcartitem]=useState([])
    const [load,setload]=useState('invisible')
    const [render,setrender]=useState(false)
    const [price,setprice]= useState(0)

    const url = 'https://backend-9jms.onrender.com/byapar/api/v1/getfromcart/'

    const [token,settoken]=useState(localStorage.getItem('Byapartoken'))

    
    
useEffect(()=>{
    if(token){
        const getdata =async()=>{
            const data = await axios.get(url,{headers:Header})
            console.log(data)
            setcartitem(data.data)
        }
        getdata()
        console.log('hmm')
    }
   
},[token,render])


const removefromcart =async(id)=>{
  const a = await supe()
      if(a == false){
        setlogin(false)
      }
    const data ={
        _id:id
    }
    try{
        setload('visible')
        const d =await axios.post('https://backend-9jms.onrender.com/byapar/api/v1/removefromcart/',data,{headers:Header})
        console.log(d)
        setload('invisible')
        render==false ? setrender(true) : setrender(false)
    }catch(error){
        setload('invisible')
        console.log(error)
    }
 
}

useEffect(()=>{
    if(cartitem){
        let p = 0;
        cartitem.forEach((e)=>{
           p += e.price;
        })
        setprice(p)
    }
},[cartitem])

   
  return (
    <div>
      <Nav/>

      <div>
        {
            cartitem.length>0 ?
             cartitem.map((item)=>(
                <div className='cart'>
                    <div className='leftcart'>
                    <div>
                    <img className='productimage' src={item.image} alt="" />
                    </div>
                    <div>
                    <div>{item.name}</div>
                <div>{item.price}</div>
                    </div>
              
                    </div>
                    {load == 'invisible' ?
               <div className='rightcart' onClick={()=>removefromcart(item._id)} title='remove from cart'><div className='cross'>❌</div></div>
               :
               <div className="rightcart">
               <div className={`${load} , loading`}></div>

               </div>
               } 
              
                </div>
             ))
             :
             <div>No items.</div>
        }
      </div>
      <div className="bottom"><div> <div className='price'>Price:</div> {price} <div className='currency'>₹</div> </div></div>
      {login == false && <Navigate to={'/login'}/>}
    </div>
  )
}

export default Cart
