import React, { useState, useContext } from 'react'
import { MainContext } from '../../contex/MainContext'

export default function ButtonFileUpload() {
  const {uploadNewFiles} = useContext(MainContext);

  function handleInputChange(e){
    uploadNewFiles(Object.values(e.target.files))
    console.log('FILES WERE UPLOAD')
  }

  return (
    <input className='upload-button-area' type='file' accept=".jpg, .jpeg, .png, .zip" multiple onChange={e => handleInputChange(e)} />
  )
}
