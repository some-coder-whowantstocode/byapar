import React from 'react'
import axios from 'axios'
import Header from './Header'

const Getdata = async(url) => {
  const data = await axios.get(url,{headers:Header});
  return data.data
}

export default Getdata
