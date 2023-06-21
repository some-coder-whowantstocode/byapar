import React, { useEffect, useRef,useState } from 'react'
import Nav from './Nav'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'


const Searchpage = () => {

    const location = useLocation()
    const name = useRef()
    const [sn,setsn]=useState()
    const [res,setres] = useState([])


    useEffect(()=>{
      const l = location.state
     
      console.log(l)
      if(l && l != null && l != undefined){
        setsn(location.state)

      }
    },[location])



    const url = `https://backend-9jms.onrender.com/byapar/api/v1/search?name=${sn}`

    
    


    useEffect(()=>{
      console.log(sn)
      const getdata =async()=>{
        const data = await axios.get(url,{headers:Header})
        console.log(data)
        setres(data.data)
    }
    getdata()
    },[sn])

    useEffect(()=>{
      console.log(res)
    },[res])


  return (
    <>
    <Nav/>
    
    <div className='resultpage'>
      {
        res.length >0 ?
        res.map((item)=>(
          <div>{item.name}</div>
        ))
        :
        <div>No results</div>
      }
    </div>
    </>
  )
}

export default Searchpage
