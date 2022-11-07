import React from 'react'
import { useContext } from 'react'
import { MainContext } from '../../contex/MainContext'

export default function DownloadButton() {
  const { downloadFiles, resultState } = useContext(MainContext)

  return (
    <button className='download-data-button' 
    onClick={downloadFiles} disabled={resultState ? "" : "disabled"}>Скачать файлы</button>
  )
}
