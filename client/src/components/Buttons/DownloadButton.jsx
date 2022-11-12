import React from 'react'
import { useContext } from 'react'
import { MainContext } from '../../contex/MainContext'

export default function DownloadButton() {
  const { downloadFiles, resultState, resultData } = useContext(MainContext)

  return (
    <>
      <button className='download-button' 
      onClick={downloadFiles} disabled={resultState ? "" : "disabled"}><span>Скачать файлы</span></button>
    </>
  )
}
