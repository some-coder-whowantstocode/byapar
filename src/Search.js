import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import './search.css'
import { NavLink, Navigate,useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { change } from './features/counter/counterSlice'
import { supe } from './Authenticated'
import Header from './Header'
import Url from './Url'


const Search = () => {

  const [products,setproducts] = useState([])
    const [gridfs,setgridfs] = useState([])
    const [show,setshow] = useState([])
    const [showimg,setshowimg] = useState([])
  const [login,setlogin]=useState(true)
  useEffect(()=>{
    const check =async()=>{
      const a = await supe()
      if(a == false){
        // //conosle.log('hi')
        setlogin(false)
      
      }
    }

    check()
  },[])


  const url = `${Url}/byapar/api/v1/getallproducts`
  useEffect(()=>{
    
  
     
      const getproduct  = async()=>{
        let d;
        try{
       
           d =await axios.get(url,{headers:Header})
          //  console.log(d)
          if(d.data){
            
            setproducts(d.data.products);
            setgridfs(d.data.grids);
          }
         
        }catch(error){
          console.log(error)
        }
        //conosle.log(d)
         
      }
  
      getproduct()
      
       
  },[])

  useEffect(()=>{
    console.log(show)
  },[show])
 


    const name = useRef()
    const [value ,setvalue]=useState('')
    const hoverd = useSelector((state)=>state.hovered.value)
  
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const set =()=>{
      const v = name.current.value
      if(v==''){
        setshow();
        
      }
      if(products && gridfs && v!= ''){
        let a = products.filter((p)=>p.name.includes(v))
        a.map((g)=>{
        let b =gridfs.filter((a)=>a._id == g.gridid)
        console.log(b)
        g.chunk = b[0].chunk
        })
        setshow(a)
        // console.log(a)
      }
       

      if(v){
        setvalue(v)
      }
     
    }


    const send =(event)=>{
      if (event.key === 'Enter') {
        navigate('/searchpage', { state: value })
      }
    }
  

  return (
    <div className='searchabove'>
    <div className='search'>
      <input className='searchbar' onKeyDown={send} type="text" placeholder='search' onChange={set} ref={name} />
      <NavLink className={'navlink'} to={'/searchpage'} state={value != null&& value}>
      <button className='searchbtn' onMouseEnter={()=>dispatch(change())} onMouseLeave={()=>dispatch(change())} >🔍</button>
        </NavLink>
      {login == false && <Navigate to={'/login'}/>}
      {!show||show.length==0 ?
      <div></div>
      :
      <div className='livehouse'>
        {
           show&&show.map((item)=>(
            <NavLink to={'/detail'} state={{product:item && item,imageurl:item && item.chunk}} className='liveresults'>
              <img className='liveimg' src={item.chunk} alt="" />
              <div className='livename'>{item.name}</div>
    
            </NavLink>
            ))
        }
      </div>
       
      }
    </div>
   
    </div>
  )
}

export default Search
