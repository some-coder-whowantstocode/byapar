import React, { useEffect, useState } from 'react'
import './cart.css'
import Nav from './Nav'
import axios from 'axios'
import { supe } from './Authenticated'
import { NavLink, Navigate } from 'react-router-dom'
import Header from './Header'
import Getdata from './Getdata'
import Resize from './Resize'
import Cartitem from './Cartitem'
import Url from './Url'
import Buy from './Buy'

const Cart = () => {


    const [login,setlogin]=useState(true)
    useEffect(()=>{
      const check =async()=>{
        const a = await supe()
        if(a == false){
          // console.log('hi')
          setlogin(false)
        
        }
      }
  
      check()
    },[])



    const [cartitem,setcartitem]=useState([])
    const [render,setrender]=useState(false)
    const [price,setprice]= useState(0)
    const [gride,setgrid] = useState([])
    const [load,setload] = useState('invisible')
    const [items,setitem] = useState([])

    const url = `${Url}/byapar/api/v1/getfromcart/`

    const [token,settoken]=useState(localStorage.getItem('Byapartoken'))

    
    
useEffect(()=>{
  try{
    if(token){
      const gd =async()=>{
        setload('visible')
        const data =await Getdata(url)
        console.log(data)
        setcartitem(data.items)
        setgrid(data.grid)
        setload('invisible')
      }
     gd();
  }
  }catch(error){
    console.log(error)
  }
  
   
},[token,render])




useEffect(()=>{
  try{
    if(cartitem){
      let p = 0;
      cartitem.forEach((e)=>{
         p += e.price;
      })
      setprice(p)
      cartitem.forEach((e)=>{
        setitem([...items,e.name])
      })
  }
  
  }catch(err){
    console.log(err)
  }
 
},[cartitem])

   
  return (
    <div className='cartpage'>
      <Nav/>
      <div className="bottom">
      <div className='carttitle'>Total price:
      <div> 
          {/* <div className='price'>Price:</div>  */}
        <div className='currency'>₹ {price} </div>  
          </div>
      </div>

       
          <NavLink className='navlink button' state={price&&items&&{amount:price,products:items}} to={'/buy'}>proceed to buy</NavLink>
          </div>
      <div className='cartbox'>
        <div className='carttitle'>Shopping Cart</div>
        <div className='pricetitle'>price</div>
        <hr className='cartline' />
        {
          load == 'visible' ?
          <div className='loading'></div>
          :
            cartitem.length>0 ?
             cartitem.map((item)=>(
              <>
              <Cartitem data={item} grid={gride && gride.filter((grid)=> grid._id == item.gridid)}/>
                </>
             ))
             :
             <div>No items.</div>
        }

      </div>
    
      {login == false && <Navigate to={'/login'}/>}
    </div>
  )
}

export default Cart
