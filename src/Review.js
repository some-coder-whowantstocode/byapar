import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Addreview from './Addreview'
import Url from './Url'
import Header from './Header'
import './review.css'
import {supe} from './Authenticated'


const Review = ({product}) => {

    const [item,setitem] = useState()
    const [reviews,setreviews] = useState({})
    const [render,setrender] = useState(false)

    useEffect(()=>{
        setitem(product)
        // console.log(product)
    },[product])


    useEffect(()=>{
        try{
            if(item){
                const getreview =async()=>{
                    const data = await axios.get(`${Url}/byapar/api/v1/getreviewbyproduct/${item}`,{headers:Header})
                    // console.log(data)
                    setreviews(data.data)
                }
                getreview()
            }
           
        }catch(error){
            console.log(error)
        }
    },[item,render])
    const [user,setuser] = useState()
    
useEffect(()=>{
    const getuser =async()=>{
        const user = await supe()
        // console.log('user',user.userId)
        const {userId} = user;
        setuser(userId)
      }
      getuser()
},[])


const removereview = async(d)=>{
    // console.log(d)
    try{
        const dat = await axios.delete(`${Url}/byapar/api/v1/removereview/${d}`,{headers:Header})
        console.log(dat)
        render == true ? setrender(false) :setrender(true)
    }catch(error){
        console.log(error)
    }
}

  return (
    <>
    <div className='reviewcontainer'>
        <div className="leftrc">
        <Addreview item={item}/>

        </div>


<div>
<div className='review'>
<div className='rheading'>Reviews</div>

    {
         reviews.length>0 ? reviews.map((r)=>(
            <div key={r._id} className='smallr'>
            
            <div className='ruser'>Review by {r.name}</div>
            <div className='rtitle'>{r.title}</div> 
            <div className='rreview'>{r.review}</div>
            {
                user == r.userid && <div>
                    <div className='del' onClick={()=>removereview((r._id))}>delete</div>
                </div>
            }
            </div>
        ))
        :
        <div>No reviews yet.</div>
    }
    </div>
</div>
    </div>

    </>
  )
}

export default Review
