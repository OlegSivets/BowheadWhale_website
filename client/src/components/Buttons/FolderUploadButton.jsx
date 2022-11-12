import React from 'react'
import { useContext } from 'react';
import { MainContext } from '../../contex/MainContext';


export default function FolderUploadButton() {
  const {uploadNewFiles} = useContext(MainContext);

  function handleInputChange(e){
    uploadNewFiles(Object.values(e.target.files))
    console.log('FILES WERE UPLOAD')
  }
  
  return (
    <div className='upload-button'>
      <label htmlFor="file-upload-directory">Выбрать папку</label>
      <input id='file-upload-directory' directory="" webkitdirectory="" type="file" onChange={e => handleInputChange(e)}/>
    </div>
  )
}
