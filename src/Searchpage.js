import React, { useEffect, useRef,useState } from 'react'
import Nav from './Nav'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import Item from './Item'
import Url from './Url'
import './searchpage.css'


const Searchpage = () => {

    const location = useLocation()
    const name = useRef()
    const [sn,setsn]=useState()
    const [res,setres] = useState([])


    useEffect(()=>{
      const l = location.state
     
      if(l && l != null && l != undefined){
        setsn(location.state)

      }
    },[location])



    const url = `${Url}/byapar/api/v1/search?name=${sn}`

    
    


    useEffect(()=>{
      const getdata =async()=>{
        const data = await axios.get(url,{headers:Header})
        setres(data.data)
    }
    getdata()
    },[sn])

    // useEffect(()=>{
    //   console.log(res)
    // },[res])


  return (
    <>
    <Nav/>
    
    <div className='resultpage'>
      {
        res.length >0 ?
        res.map((item)=>(
         <Item key={item._id} item={item}/>
        ))
        :
        <div>No results</div>
      }
    </div>
    </>
  )
}

export default Searchpage
