import React, { useContext } from 'react'
import { MainContext } from '../../contex/MainContext'

export default function ImageDeleteButton({file}) {
  const {removeUploadedFile, resultState} = useContext(MainContext)

  function handleButtonClick() {
    removeUploadedFile(file)
  }

  return (
    <div>
      {resultState ? <></>:
        <button onClick={handleButtonClick} className='close'></button>}
    </div> 
  )
}
