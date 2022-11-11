import React from 'react'
import { useContext } from 'react'
import { MainContext } from '../../contex/MainContext'
import ImageDeleteButton from '../Buttons/ImageDeleteButton'

export default function ImageItem({file}) {
  const {resultState} = useContext(MainContext)

  return (
    <div className='image-box'>
      <ImageDeleteButton file={file}/>
      { file['type'] != "application/x-zip-compressed" ?
        resultState ? 
          <div className='text-box'>
            <img src={URL.createObjectURL(file)}/>
          </div>:
          <a className='text-box' href={URL.createObjectURL(file)}>
            <img src={URL.createObjectURL(file)}/>
          </a>: 
        <div className='text-box'>
          <p className='img-error-label'>{file['name']}</p>
        </div>
      }
    </div>
  )
}
