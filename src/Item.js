import React, { useEffect } from 'react'

const Item = ({job}) => {
    useEffect(()=>{
        console.log(job)
    },[job])
  return (
    <div>
      {
        job && <div className='info'>
            <div>{job.company}</div>
            <div>{job.position}</div>
            <div>{job.status}</div>
        </div>
      }
    </div>
  )
}

export default Item
