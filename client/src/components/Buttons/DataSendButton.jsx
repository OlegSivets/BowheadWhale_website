import React from 'react'
import { useContext } from 'react'
import { MainContext } from '../../contex/MainContext'


export default function DataSendButton() {
  const {sendFilesData} = useContext(MainContext)

  function handleButtonClick(){
    sendFilesData()
  }

  return (
    <button className='data-send-button' onClick={handleButtonClick}>Обработать файлы</button>
  )
}
