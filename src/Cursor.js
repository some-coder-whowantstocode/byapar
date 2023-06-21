import React, { useEffect, useRef, useState } from 'react'
import './cursor.css'
import { useSelector,useDispatch } from 'react-redux'
import { change } from './features/counter/counterSlice'


const Cursor = () => {

   const [position,setPosition] = useState({x:0,y:0})

  
   const hoverd = useSelector((state)=>state.hovered.value)
  //  console.log(hoverd)

  useEffect(()=>{
    const handleMouseMove = (event) => {
        setPosition({ x: event.clientX, y: event.clientY });
      };

      document.addEventListener('mousemove',handleMouseMove)

      return () => document.removeEventListener('mousemove',handleMouseMove)

  },[])

  return (
    <div   className={`cursorfollower ${hoverd ==true && 'change'}`} 
    style={{
        position: 'absolute',
        top:position.y,
        left: position.x,
        zIndex: '10000',
    }
        
    }
    >
      {/* <div className="middlecursor"></div> */}
    </div>
  )
}

export default Cursor
