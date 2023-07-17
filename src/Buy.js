import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Url from './Url'
import Header from './Header'
import { supe } from './Authenticated'
import DropIn from 'braintree-web-drop-in-react'
import { useLocation } from 'react-router-dom'
import './buy.css'
import Nav from './Nav'

const Buy = () => {

  const [price,setprice] = useState();
  const [items,setitems] = useState([]);


  const productref = useRef();
  const amountref = useRef();
  const nameref = useRef();
  const emailref = useRef();
  const phoneref = useRef();

  

  const location = useLocation();

  useEffect(()=>{

    if(location.state.amount){
      setprice(location.state.amount);
    }
    if(Array.isArray(location.state.products)){
      location.state.products.map((product)=>{
        setitems((items)=>[...items,product])
      })
    }
    console.log(Array.isArray(location.state.products))
  },[location.state])

  useState(()=>{
    console.log(items)
  },[items])

  const url = `${Url}/byapar/api/v1//payment/payu`

  const handleclick =async(event)=>{
    try{
      event.preventDefault();
      const formData = {
        amount: amountref.current.value,
        productinfo: 'lake',
        firstname: nameref.current.value,
        email: emailref.current.value,
        phone: phoneref.current.value,
      }
      console.log(formData)
    const a = await axios.post(url,formData,{headers:Header})
    if(a.data){
      const {url} = a.data;
      window.location.href = url

    }
    console.log(a);
    }catch(error){
      console.log(error)
    }
  }


  return (
    <>
    <Nav/>
    <div className='buy_table'>
    

      <div className="provide_details">
        <form action="https://test.payu.in/_payment" method="post">
        <p className='paydet writing'>Payment Details</p>
        <p className='writing'>Amount to pay</p>
        <div className="pricebox">
          <div className="inputsymbol">₹</div>
        <input type="number" className='inputbuy' value={price&&price} ref={amountref} readOnly />
        </div>
        <p className='writing'>customer Phone</p>
        <div className='phonebox'>
        <select name="country" className='country' >
          <option value="India" >+91</option>
          <option value="Brazil" >+55</option>
          <option value="Chad" >+235</option>
          <option value="Egypt" >+20</option>
        </select>
        <input type="tel" className='inputbuy' id="phone" placeholder='Enter phone number' ref={phoneref} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required></input>
        </div>
        <p className='writing'>email</p>
        <input type="email" className='inputbuy' ref={emailref} required />
        <p className='writing'>Name</p>
        <input type="text" className='inputbuy' ref={nameref} required />
        <p className='writing'>Address</p>
        <input type="text" className='inputbuy'  required/>

        <button onClick={(e)=>handleclick(e)} className='buybtn'>Pay now</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Buy
