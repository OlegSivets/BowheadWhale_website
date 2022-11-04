import React, { useState, useContext } from 'react'
import { MainContext } from '../../contex/MainContext'

export default function ButtonFileUpload() {
  const [files, setFiles] = useState([])
  const {setUploadedFiles} = useContext(MainContext);

  function handleInputChange(e){
    setUploadedFiles(e.target.files)

    // TODO: add only new files to files state in context
    console.log('files were upload')
  }

  return (
    <div>
        <label>Выберите файлы для загрузки</label>
        <input type='file' multiple onChange={e => handleInputChange(e)} />
    </div>
  )
}
