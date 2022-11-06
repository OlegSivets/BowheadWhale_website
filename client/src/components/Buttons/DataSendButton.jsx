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
    <button className='data-send-button' onClick={handleButtonClick}>Обработать файлы</button>
  )
}
