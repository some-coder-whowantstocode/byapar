import React from 'react'

const Resize = (base64,width,height ) => {
    return new Promise((resolve) => {
        let canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        let context = canvas.getContext('2d')
        let img = new Image()
        img.onload = () => {
          context.scale(width / img.width, height / img.height)
          context.drawImage(img, 0, 0)
          resolve(canvas.toDataURL())
        }
        img.src = 'data:image/png;base64,' + base64
      })
}

export default Resize
