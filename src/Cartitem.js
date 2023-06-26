import React, { useEffect, useState } from 'react'
import Resize from './Resize'
import { supe } from './Authenticated'
import axios from 'axios'
import Header from './Header'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Url from './Url'

const Cartitem = ({data}) => {
    const [item ,setitem] = useState()
    const [imgurl,setimgurl] = useState()
    const [login,setlogin] = useState(true)
    const [render,setrender]=useState(false)
    const [load,setload]=useState('invisible')
    const [ido,setido] = useState()
    const navigate = useNavigate()


    useEffect(()=>{
        console.log(data)
        setitem(data);
        setido(data.productid)
    },[data])


    useEffect(()=>{
        if(ido){
         
                const getdata =async()=>{
                    try{
                    const d = await axios.get(
                `${Url}/byapar/api/v1/getoneproduct/:${ido}`,
                {headers:Header}
                    )
                    if(d.data){
                        const a = await Resize(d.data.image.data)
                        setimgurl(a)
                    }
                }catch(error){
                    console.log(error)
                }
                }
                getdata()
          
           
        }
    },[ido])

    useEffect(()=>{
        if(render){
            navigate('/products')
            console.log('hi')
        }
    },[render])


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
              const d =await axios.post(`${Url}/byapar/api/v1/removefromcart/`,data,{headers:Header})
              console.log(d)
              setload('invisible')
              setrender(true)
          }catch(error){
              setload('invisible')
              console.log(error)
          }
       
      }
    

  return (
    <div>
        {
        
        
        item && 
        <>
        <div className='cart'>
        <div className='leftcart'>
        <div>
            <img className='cartimage' src={
            imgurl && imgurl
          } alt="product image" />
      
        </div>
        <div>
       
        </div>
  
        </div>
        <div className='cartdiv'>
            <div className="cartleftdiv">
            <div className='cartname'>{item.name}</div>
             {load == 'invisible' ?
   <div className='rightcart' onClick={()=>removefromcart(item._id)} title='remove from cart'><div className='cross'>Delete</div></div>
   :
   <div className="rightcart">
   <div className={`${load} , loading`}></div>

   </div>
   } 
            </div>
            <div className="cartrightdiv">
            <div className='cartprice'>₹{item.price}</div>

            </div>
          </div>
       
  
    </div>
    <hr className='cartline' />

    </>
        }
       
    </div>
  )
}

export default Cartitem
