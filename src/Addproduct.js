import React,{useRef,useState,useEffect} from 'react'
import Nav from './Nav'
import axios from 'axios'
import './addproduct.css'
import defaul from './default.png'
import { supe } from './Authenticated'
import { Navigate } from 'react-router-dom'

const Addproduct = () => {



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

    const name = useRef()
    const description = useRef()
    const price = useRef()
    const [ig,setig]= useState(defaul)
    const [load,setload]=useState('invisible')
    const err = useRef() 
  
  
    const changebase =(e)=>{
      if(e.target.files[0]){
        const filereader = new FileReader();
        filereader.readAsDataURL(e.target.files[0])
        filereader.onload =()=>{
          setig(filereader.result)
        }
      }
    }
  
    const additem =async(e)=>{
      err.current.innerText =''
      const n = await name.current.value
      const d = await description.current.value
      const p = await price.current.value
  
      if(ig || n != '' || d != '' || p!=''){
       
        const data ={
          name:`${n}`,
          description:`${d}`,
          price:Number(p),
          image: ig
        }
        console.log(data)
        const token = localStorage.getItem('Byapartoken')
        const headers ={
          'Content-Type':'application/json',
          'authorization': `${token}`
        }
        console.log(token)
        try{
          setload('visible')
          const da = await axios.post('https://backend-9jms.onrender.com/byapar/api/v1/addproduct',data,{headers:headers})
          
          
        console.log(da)
        name.current.value =''
        description.current.value =''
        price.current.value = ''
        setig(defaul)
        setload('invisible')
        }catch(error){
          setload('invisible')
          if(error.response){
            console.log(error.response.data.msg)
            err.current.innerText = error.response.data.msg
          }else{
            
            console.log(error.message)
            err.current.innerText = error.message
          }
        }
          
      }
       
     
  
    }


  return (
    <>
    <Nav/>
    <div className='adb'>
   
    <div className='addbox'>
    <h3>Product Details</h3>
    <div className="dividebox">

    
      <div className="leftbox">
      <input id='imag' type="file" onChange={changebase} accept='.jpeg,.png,.jpg'/>
      {/* <label className='imaglabel' htmlFor="imag">chose an image.</label> */}
      <div>
        <p>Choose image</p>
        <label htmlFor="imag">
        <img src={ig} className='pimage' alt="" />

        </label>

      </div>
      </div>
     <div className="rightbox">
    
     
      <div>
        <p>Name </p>
      <input type="text" ref={name} className='pname' />

      </div>
      
      <div>
        <p>Description</p>
      <textarea name="pdes" ref={description}  cols="30" rows="10"></textarea>
      </div>
      <div>
        <p>Price</p>
      <input type="number" ref={price} className='pprice' />

      </div>
      <button onClick={additem} className='addp'>Add</button>
      <div className={`${load} , loading`}></div>
      <div className='error' ref={err}></div>
     </div>
     </div>
    </div>
   
  
    <div/>
    
    {login == false && <Navigate to={'/login'}/>}
    </div>
    </>

  )
}

export default Addproduct
