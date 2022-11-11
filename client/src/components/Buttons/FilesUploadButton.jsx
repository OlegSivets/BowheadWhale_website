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
    <div className='upload-buttons-area'>
      <div className='upload-button'>
        <label htmlFor="file-upload"><span>Загрузить файлы</span></label>
        <input id='file-upload' type='file' accept=".jpg, .jpeg, .png, .zip" multiple onChange={e => handleInputChange(e)} />
      </div>
      <div className='upload-button'>
        <label htmlFor="file-upload-directory">Выбрать папку</label>
        <input id='file-upload-directory' directory="" webkitdirectory="" type="file" onChange={e => handleInputChange(e)}/>
      </div>
      <DataSendButton/>
    </div>
  )
}
