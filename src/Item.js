import React, { useEffect, useState } from 'react'
import './item.css'
import { NavLink } from 'react-router-dom'
import Resize from './Resize'

const Item = ({item,image}) => {
  const [p,setp]= useState({})
  const [url,seturl] = useState()
    useEffect(()=>{
        // console.log(item)
        let a = item
       const r = Resize(a)
        setp(item)
    },[item])

    useEffect(()=>{
      // console.log(image)
      try{
        if(image.chunk){
     
          console.log(image.chunk)
          seturl(image.chunk)
         }else{
           seturl(image[0].chunk)
         }
      }catch(error){
        console.log(error)
      }
    
    },[image])

    useEffect(()=>{
      // console.log(url)
    },[url])


  return (
    <div>
      {
        Object.keys(p).length>0 ?
       

        
         <div key={p._id} className='product'>
         <div className="leftproduct">
             <NavLink className={NavLink} to={'/detail'} state={{product:p && p,imageurl:url && url}}>
             <img src={url && `${ url}`} className='productimage' alt="" />
             </NavLink>

             </div>
          
             <div className="rightproduct">
             <span><NavLink to={'/detail'} state={{product:p && p,imageurl:url && url}}  className='prodname navlink'>{p.name}</NavLink> </span>
             <div><sup>₹</sup>{p.price}</div>
             </div>
         </div> 
        
         :
         <div>No items here try adding some.</div>
      }

    </div>
  )
}

export default Item
