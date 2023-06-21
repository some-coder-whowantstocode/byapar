import React, { useEffect, useState } from 'react'
import './item.css'
import { NavLink } from 'react-router-dom'

const Item = ({item}) => {
  const [p,setp]= useState({})
    useEffect(()=>{
        console.log(item)
        setp(item)
    },[item])
  return (
    <div>
      {
        Object.keys(p).length>0 ?
       

        
         <div key={p._id} className='product'>
         <div className="leftproduct">
             <NavLink className={NavLink} to={'/detail'} state={p}>
             <img src={p.image} className='productimage' alt="" />
             </NavLink>

             </div>
          
             <div className="rightproduct">
             <span><NavLink to={'/detail'} state={p}  className='prodname navlink'>{p.name}</NavLink> </span>
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
