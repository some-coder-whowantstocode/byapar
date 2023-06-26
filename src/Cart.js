import React, { useEffect, useState } from 'react'
import './cart.css'
import Nav from './Nav'
import axios from 'axios'
import { supe } from './Authenticated'
import { Navigate } from 'react-router-dom'
import Header from './Header'
import Getdata from './Getdata'
import Resize from './Resize'
import Cartitem from './Cartitem'

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
        const gd =async()=>{
          const data =await Getdata(url)
          console.log(data)
          setcartitem(data)
        }
       gd();
    }
   
},[token,render])




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
    <div className='cartpage'>
      <Nav/>

      <div className='cartbox'>
        <div className='carttitle'>Shopping Cart</div>
        <div className='pricetitle'>price</div>
        <hr className='cartline' />
        {
          
            cartitem.length>0 ?
             cartitem.map((item)=>(
              <>
              <Cartitem data={item}/>
                </>
             ))
             :
             <div>No items.</div>
        }

      </div>
      <div className="bottom">
      <div className='carttitle'>Total price:
      <div> 
          {/* <div className='price'>Price:</div>  */}
        <div className='currency'>₹ {price} </div>  
          </div>
      </div>

       
          <button>proceed to buy</button>
          </div>

      {login == false && <Navigate to={'/login'}/>}
    </div>
  )
}

export default Cart
