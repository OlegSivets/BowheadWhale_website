import React from 'react'
import ImageDeleteButton from '../Buttons/ImageDeleteButton'

export default function ImageItem({file}) {
  return (
    <div className='image-box'>
      <ImageDeleteButton file={file}/>
      { file['type'] != "application/x-zip-compressed" ?
        <div className='text-box'>
          <img src={URL.createObjectURL(file)}/>
        </div>: 
        <div className='text-box'>
          <p className='img-error-label'>{file['name']}</p>
        </div>
      }
    </div>
  )
}
