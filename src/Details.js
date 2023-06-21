import React, { useState,useEffect } from 'react'
import Nav from './Nav'
import { useLocation,Navigate } from 'react-router-dom'
import './details.css'
import { supe } from './Authenticated'
import axios from 'axios'
import Header from './Header'
import {MdLocationOn} from 'react-icons/md'


const Details = () => {
    const location = useLocation()
    const [product,setproduct]=useState({})
    const [load,setload] = useState('invisible')

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

    useState(()=>{
        setproduct(location.state)
    },[location])


   const addtocart =async(id,price,name,image)=>{
      const a = await supe()
      if(a == false){
        setlogin(false)
      }
      const data ={
        productid:id.toString(),
        price:price,
        name:name,
        image:image
      }
      console.log(data)
      try{
        setload('visible')
        const d =await axios.post(`https://backend-9jms.onrender.com/byapar/api/v1/addtocart/:${id}`,data,{headers:Header})
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
      <div className='detail'>
        {
            Object.keys(product).length>0 ?
            <div className='det'>
                <div className="leftdet">
                <img className='detimg' src={`${product.image}`} alt="" />

                </div>
                <div className="rightdet">
                    <div className='detname'>{product.name}</div>
                    <hr className='line'/>
                    <div className='detprice'>Price:<sup>₹</sup>{product.price}</div>
                    <hr className='line'/>
                    <div className='detabout'>About</div>
                    <div className='detdeshead'>Description</div>
                    <div className='detdes'>{product.description}</div>
                </div>
                <div className="addtocart">
                    <div className='detprice'><sup>₹</sup>{product.price}</div>
                    <div className='detloc'><MdLocationOn className='logo'/>select delivery location.</div>
                 {load == 'invisible' ?
               <div className="middleprod" onClick={()=>addtocart(product._id,product.productrice,product.name,product.image)} title='Add to cart'>Add to cart</div>
                :
                <div className="middleprod">
                <div className={`${load} , loading`}></div>

                </div>
                } 
                </div>
            </div>
            :
            <div>please wait....</div>
        }
      </div>
      {login == false && <Navigate to={'/login'}/>}

    </div>
  )
}

export default Details
