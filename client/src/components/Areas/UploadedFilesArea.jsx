import React from 'react'
import { useContext } from 'react'
import { MainContext } from '../../contex/MainContext'
import ImageItem from '../Items/ImageItem'

export default function UploadedFilesArea() {
  const {uploadedFiles, filesVisibility} = useContext(MainContext)

  console.log('CURRENT_FILES: ', uploadedFiles)

  return (
    <div className='uploaded-files-area'> 
        {filesVisibility && uploadedFiles.length > 0 &&
        uploadedFiles.map((file, i) => (
          <ImageItem file={file} key={i}/>   
         ))}
    </div>
  )
}