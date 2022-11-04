import React from 'react'
import { useContext } from 'react'
import { MainContext } from '../../contex/MainContext'


export default function DataSendButton() {
  const {uploadedFiles, sendFilesData} = useContext(MainContext)

  function handleButtonClick(){
    if (uploadedFiles){
        sendFilesData(uploadedFiles)
    } else {
        console.log('no files were selected')
    }

  }

  return (
    <div>
        <button onClick={handleButtonClick}>Загрузить файлы</button>
    </div>
  )
}
