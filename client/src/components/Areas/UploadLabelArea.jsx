import React from 'react'
import { useContext } from 'react'
import { MainContext } from '../../contex/MainContext'
import HideFilesSwitch from '../Items/HideFilesSwitch'

export default function UploadLabelArea() {
  const {updateStatus, uploadedFiles, resultState} = useContext(MainContext)
  
  return (
    <div className='upload-control-area'>
      <div className='upload-control-label'>
      {updateStatus ? 
          uploadedFiles.length > 0 ? 
          <label>Загруженные фото: {uploadedFiles.length}шт.</label> :
          <label>Загрузите фото</label>: 
          <label>Упорно ищем китов...</label>}
      </div>
      <HideFilesSwitch/>
    </div>
  )
}


//upload-label