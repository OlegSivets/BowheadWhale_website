import React from 'react'
import ImageDeleteButton from '../Buttons/ImageDeleteButton'

export default function ImageItem({file}) {
  return (
    <div className='image-box'>
      <ImageDeleteButton file={file}/>
      { file['type'] != "application/x-zip-compressed" ?
        <a className='text-box' href={URL.createObjectURL(file)}>
          <img src={URL.createObjectURL(file)}/>
        </a>: 
        <div className='text-box' href={URL.createObjectURL(file)}>
          <p className='img-error-label'>{file['name']}</p>
        </div>
      }
    </div>
  )
}
