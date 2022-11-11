import React from 'react'
import { useContext } from 'react'
import { MainContext } from '../../contex/MainContext'
import HideFilesSwitch from '../Items/HideFilesSwitch'

export default function UploadLabelArea() {
  const {updateStatus, uploadedFiles, resultState} = useContext(MainContext)
  
  return (
    <div className='upload-control-area'>
        { !resultState ? 
            updateStatus ? 
                uploadedFiles.length > 0 ? 
                <div>Загруженные фото: {uploadedFiles.length}шт.</div> :
                <div>Загрузите фото</div>: 
                <div>Упорно ищем китов...</div>:
            <div>Результат поиска</div>
        }
      <HideFilesSwitch/>
    </div>
  )
}


//upload-label