import React from 'react'
import { useContext } from 'react'
import { MainContext } from '../../contex/MainContext'

export default function FilesDeleteButton() {
  const { setUploadedFiles, setResultState } = useContext(MainContext)

  const handleButtonClicked = () => {
    setUploadedFiles([])
    setResultState(false)
  }

  return (
    <button className='delete-button red' onClick={handleButtonClicked}><span>Удалить файлы</span></button>
  )
}
