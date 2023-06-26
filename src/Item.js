import React, { useEffect, useState } from 'react'
import './item.css'
import { NavLink } from 'react-router-dom'
import Resize from './Resize'

const Item = ({item}) => {
  const [p,setp]= useState({})
  const [url,seturl] = useState()
    useEffect(()=>{
        // console.log(item)
        let a = item.image.data
       const r = Resize(a)
        setp(item)
        seturl(r)
    },[item])


  return (
    <div>
      {
        Object.keys(p).length>0 ?
       

        
         <div key={p._id} className='product'>
         <div className="leftproduct">
             <NavLink className={NavLink} to={'/detail'} state={p}>
             <img src={url && url} className='productimage' alt="" />
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
