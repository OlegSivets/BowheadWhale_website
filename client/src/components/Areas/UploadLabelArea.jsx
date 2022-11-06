import React from 'react'
import { useContext } from 'react'
import { MainContext } from '../../contex/MainContext'

export default function UploadLabelArea() {
  const {updateStatus, uploadedFiles} = useContext(MainContext)
  
  return (
    <div className='upload-label'>
        {updateStatus ? 
            uploadedFiles.length > 0 ? 
            <div>Загруженные фото:</div> :
            <div>Загрузите фото</div>
            : 
            <div>Упорно ищем китов...</div>
        }
    </div>
  )
}
