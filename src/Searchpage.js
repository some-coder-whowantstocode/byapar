import React, { useEffect, useRef,useState } from 'react'
import Nav from './Nav'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import Item from './Item'
import Url from './Url'
import './searchpage.css'
import Searchoptions from './Searchoptions'
import { useSelector } from 'react-redux'


const Searchpage = () => {

const [load,setload] = useState(false)
  
const amount = useSelector((state)=>state.amount.value);

const [sa,setsa] = useState()
useEffect(()=>{
  setsa(`price<${amount.max}`)
},[amount])

const type = useSelector((state)=>state.cpt.value)
// console.log(type)
const [st,setst]=useState('')
useEffect(()=>{
  // console.log(type.type)
  if(type.type){
    setst(type.type)

  }
},[type])


    const location = useLocation()
    const name = useRef(sa)
    const [sn,setsn]=useState()
    const [res,setres] = useState([])
    const [grid,setgrid] =useState([])


    useEffect(()=>{
      const l = location.state
     
      if(l && l != null && l != undefined){
        setsn(location.state)

      }
    },[location])



    const url = `${Url}/byapar/api/v1/search?name=${sn}&numericalfilters=${sa}&ptype=${st}`

    
    


    useEffect(()=>{
      const getdata =async()=>{
        try{
          setload(true)
          const dat = await axios.get(url,{headers:Header})
          setres(dat.data.product)
          setgrid(dat.data.grid)
          console.log(dat)
          setload(false)
        }catch(error){
          console.log(error)
        }
    }
    getdata()
    },[sn,sa,st])

    // useEffect(()=>{
    //   console.log(res)
    // },[res])


  return (
    <>
    <Nav/>
    
    <div className='resultpage'>
      <div className='leftresultpage'>
      <Searchoptions/>

      </div>
      <div className='rightresultpage'>

      {
        res.length >0 ?
        load? 
        <div className="loading"></div>
        :
        res.map((item)=>(
         <Item key={item._id} item={item} image={grid && grid.filter((g)=>g._id == item.gridid)}/>
        ))
        :
        load? 
        <div className="loading"></div>
        :
        <div>No results</div>
      }
      </div>

    </div>
    </>
  )
}

export default Searchpage
