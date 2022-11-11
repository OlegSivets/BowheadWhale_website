import React from 'react'
import { useContext } from 'react'
import { MainContext } from '../../contex/MainContext'


export default function DataSendButton() {
  const {sendFilesData} = useContext(MainContext)

  function handleButtonClick(){
    sendFilesData()
  }

  return (
    <button className='send-button' onClick={handleButtonClick}><span>Обработать файлы</span></button>
  )
}
