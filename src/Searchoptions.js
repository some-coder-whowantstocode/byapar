import React, { useEffect, useRef, useState } from 'react'
import './searchoptions.css'
import { useSelector,useDispatch } from 'react-redux'
import { changeamount } from './features/counter/price'
import { changetype } from './features/counter/type'

const Searchoptions = () => {

    const [checkt,setcheckt] = useState('ALL');
    const [checka,setchecka] = useState(999999999)

    const parr = [100,200,500,'ANY']

    const tarr = ['MEN','WOMEN','KID','FOOD','ALL'];
   

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(changeamount({min:0,max:999999999}));
        dispatch(changetype(''));
    },[]);

    const sendamount =(amount,e)=>{
      
        if(e.target.className == 'amountso'){
            setchecka(amount)           
            
            amount === "ANY" ? amount = 999999999 : amount = amount;
            dispatch(changeamount({
            max:amount
        }))
        }
       
    }


    const sendtype =(type,e)=>{
        // console.log(type)
        if(e.target.className == "amountso"){
            setcheckt(type)           
                dispatch(changetype({type}))
        }
    }
  

  return (
    <>
    
    <div className='priceopt'>
      <div className='searchoptionheadline'>Price</div>
    
      {
        parr.map((pr)=>(
            <>
            {
                checka && checka == pr ?
            <div key={`${pr}`} className='black' onClick={(e)=>sendamount(pr,e)}>{`Upto ₹${pr}`}</div>

            :
            <div key={`${pr}`} className='amountso' onClick={(e)=>sendamount(pr,e)}>{`Upto ₹${pr}`}</div>

            }
            </>
        )) 
      }
    </div>
    <div className='typeopt'>
        <div className='searchoptionheadline'>Type</div>

        {
            tarr.map((t)=>(
                <>
                {
                    checkt && checkt==t ?
                    <div key={`${t}`} onClick={(e)=>sendtype(t,e)} className='black'>{`FOR ${t}`}</div>
                    :
                <div key={`${t}`} onClick={(e)=>sendtype(t,e)} className='amountso'>{`FOR ${t}`}</div>
                }
                </>
            ))
        }
    </div>
   
    </>
  )
}

export default Searchoptions
