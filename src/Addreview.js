import React, { useEffect, useState } from 'react'
import Url from './Url'
import Header from './Header'
import axios from 'axios'
import './addreview.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { supe } from './Authenticated'

const Addreview = ({item}) => {


    const [login,setlogin] = useState(true)
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

    const [review,setreview] = useState();
    const [title,settitle] = useState();
    const [visibility,setvisibility] = useState('invisible');
    const [pid,setpid] = useState();

    useEffect(()=>{
        setpid(item)
    },[item])


    const navigate = useNavigate()
    const postreview = async()=>{
        try{

            const data ={
                product:pid,
                title:title,
                review:review
            }
            setvisibility('invisible')


            const d = await axios.post(`${Url}/byapar/api/v1/addreview`,data,{headers:Header})
            console.log(d)
            
        }catch(error){
            console.log(error);
        }
    }



    const show =()=>{
       visibility == 'invisible' ? setvisibility('visible') : setvisibility('invisible')
    }

    const sendtitle =(e)=>{
        const tv =e.target.value;
        // console.log(tv)
        settitle(tv);
    }

    const sendreview =async(e)=>{
        const rv =e.target.value;
        // console.log(tv)
        setreview(rv);
      
    }

    const cancelreview =()=>{
        setvisibility('invisible')
    }

  return (
    <div >
<button className='addreview' onClick={show} >Add review</button>
<div className={`bigaddreview ${visibility}`}>

<div className={`reviewbox  ${visibility}`}>
    <div className={`smallreviewbox`}>
        <input onChange={(e)=>sendtitle(e)} type="text" className='reviewtitle' placeholder='title' />
        <textarea onChange={(e)=>sendreview(e)} className='reviewb' placeholder='review' name="review" id="review" cols="100" rows="10"></textarea>
    <div className='controlreview'>
    <button className='pr p' onClick={postreview}>post</button>
    <button className='pr c' onClick={cancelreview}>Cancel</button>
    </div>
  
    </div>
</div>
</div>
{login == false && <Navigate to={'/login'}/>}

    </div>
  )
}

export default Addreview
