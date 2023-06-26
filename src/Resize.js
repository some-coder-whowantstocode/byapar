import React from 'react'

function Resize  (buffer)  {
  let b = new Uint8Array(buffer)
  const CHUNK_SIZE = 0x8000; // arbitrary chunk size
  let result = '';
  for (let i = 0; i < b.length; i += CHUNK_SIZE) {
  const chunk = b.subarray(i, i + CHUNK_SIZE);
  result += String.fromCharCode.apply(null, chunk);
  }
  const r = btoa(result);
  return 'data:image/png;base64,' + r
     
}

export default Resize
