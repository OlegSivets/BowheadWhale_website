import React, { useState, useContext } from 'react'
import { MainContext } from '../../contex/MainContext'
import DataSendButton from './DataSendButton';

export default function FilesUploadButton() {
  const {uploadNewFiles} = useContext(MainContext);

  function handleInputChange(e){
    uploadNewFiles(Object.values(e.target.files))
    console.log('FILES WERE UPLOAD')
  }

  return (
      <div className='upload-button'>
        <label htmlFor="file-upload">Выбрать файлы</label>
        <input id='file-upload' type='file' accept=".jpg, .jpeg, .png, .zip" multiple onChange={e => handleInputChange(e)} />
      </div>
  )
}

// className='upload-buttons-area'
