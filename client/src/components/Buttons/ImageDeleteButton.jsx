import React, { useContext } from 'react'
import { MainContext } from '../../contex/MainContext'

export default function ImageDeleteButton({file}) {
  const {removeUploadedFile} = useContext(MainContext)

  function handleButtonClick() {
    removeUploadedFile(file)
  }

  return (
    <button onClick={handleButtonClick} className='close'></button>
  )
}
