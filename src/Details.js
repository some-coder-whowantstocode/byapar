import React, { useState,useEffect } from 'react'
import Nav from './Nav'
import { useLocation,Navigate,useNavigate } from 'react-router-dom'
import './details.css'
import { supe } from './Authenticated'
import axios from 'axios'
import Header from './Header'
import {MdLocationOn} from 'react-icons/md'
import Resize from './Resize'
import Url from './Url'
import Review from './Review'


const Details = () => {
    const location = useLocation()
    const [product,setproduct]=useState({})
    const [load,setload] = useState('invisible')
    const [imgurl,setimgurl] = useState()

    const [login,setlogin]=useState(true)
    useEffect(()=>{
      const check =async()=>{
        const a = await supe()
        if(a == false){
          // console.log('hi')
          setlogin(false)
        
        }
      }
  
      check()
    },[])

    useState(()=>{
      // console.log(location.state)
try{
  setproduct(location.state.product)
  //  const r = Resize(location.state.image.data)
   setimgurl(location.state.imageurl)
}catch(error){
  console.log(error)
}
        
    },[location])

    const  navigate = useNavigate();
   const addtocart =async(id,price,name,gridid)=>{
      const a = await supe()
      if(a == false){
        setlogin(false)
      }
      const formdata = new FormData();
      formdata.append("productid",id);
      formdata.append("price",price);
      formdata.append("name",name);
      formdata.append('gridid',gridid);
      // console.log(formdata.get('file'))

      try{

        setload('visible')
        const d =await axios.post(
          `${Url}/byapar/api/v1/addtocart/:${id}`,
          formdata,
        {headers:Header}
        )
        setload('invisible')
      navigate('/cart')
      }catch(error){
        setload('invisible')
        console.log(error)
      }

      // console.log(id)
    }


  return (
    <div>
      <Nav/>
      <div className='detail'>
        {
            Object.keys(product).length>0 ?
            <>
            <div className='det'>
                <div className="leftdet">
                <img className='detimg' src={imgurl && imgurl} alt="" />

                </div>
                <div className="rightdet">
                    <div className='detname'>{product.name}</div>
                    <hr className='line'/>
                    <div className='detprice'>Price:<sup>₹</sup>{product.price}</div>
                    <hr className='line'/>
                    <div className='detabout'>About</div>
                    <div className='detdeshead'>Description</div>
                    <div className='detdes'>{product.description}</div>
                </div>
                <div className="addtocart">
                    <div className='detprice'><sup>₹</sup>{product.price}</div>
                    <div className='detloc'><MdLocationOn className='logo'/>select delivery location.</div>
                    <div className="adcbox">

                 {load == 'invisible' ?
               <div className="middleprod" onClick={()=>addtocart(product._id,product.price,product.name,product.gridid)} title='Add to cart'>Add to cart</div>
                :
                <div className="middleprod">
                <div className={`${load} , loading`}></div>

                </div>
                } 
                    </div>

                </div>
            </div>
            <Review product={product._id}/>

            </>
            :
            <div>please wait....</div>
        }
      </div>
      {login == false && <Navigate to={'/login'}/>}

    </div>
  )
}

export default Details
