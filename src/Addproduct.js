import React,{useRef,useState,useEffect} from 'react'
import Nav from './Nav'
import axios from 'axios'
import './addproduct.css'
import defaul from './default.png'
import { supe } from './Authenticated'
import { Navigate } from 'react-router-dom'
import Resize from './Resize'
import Url from './Url'
import Header from './Header'

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
    const [resize,setresize]=useState(defaul)
    const [load,setload]=useState('invisible')
    const err = useRef()
    const [typ,settype]=useState('MEN')
    
//  change the image to base64
    const changebase =async(e)=>{
      console.log('start')
      if(e.target.files[0]){


        const filereader = new FileReader();
        filereader.readAsDataURL(e.target.files[0])
        let base64String
        filereader.onload =(event)=>{
          base64String = event.target.result
          setig(base64String)
        }
      
      }
    }

// 
    const additem =async(e)=>{
      const a = await supe()
      if(a == false){
        setlogin(false)
      }
      err.current.innerText =''
      const n = await name.current.value
      const d = await description.current.value
      const p = await price.current.value
      const t = typ
      console.log(typ)
      if(ig || n !== '' || d !== '' || p!=='' || t!==''){
        const formData = new FormData();
        formData.append("name", n);
        formData.append("description", d);
        formData.append("price", p);
        formData.append("file", ig);
        formData.append("ptype", t);
    
        const token = localStorage.getItem("Byapartoken");
     
        try {
          setload("visible");
          const da = await axios.post(
            `${Url}/byapar/api/v1/addproduct`,

            formData,
            { headers: Header }
          );
       
        setload('invisible')
        }catch(error){
          setload('invisible')
          if(error.response){
            console.log(error.response)
            if(err.current){
              err.current.innerText = error.response.data.msg

            }
          }else{
            
            console.log(error)
            err.current.innerText = error.message
          }
        }
        name.current.value =''
        description.current.value =''
        price.current.value = ''
        // setig(defaul)
      }
       
     
  
    }


    const type = (e)=>{
      // console.log(e.target.value)
      settype(e.target.value)
    }


  return (
    <>
    <Nav/>
    <div className='adb'>
   
    <div className='addbox'>
    <h3>Product Details</h3>
    <div className="dividebox">

    
      <div className="leftbox">
      <input id='imag' type="file" name='file' onChange={changebase} accept='.png,.jpg'/>
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
      <label htmlFor="ptype">Choose product type:</label>
        <select name="Type" onChange={type} id="ptype">
          <option value="MEN" >MEN</option>
          <option value="WOMEN" >WOMEN</option>
          <option value="CHILDREN" >CHILDREN</option>
          <option value="FOOD" >FOOD</option>
        </select>
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
