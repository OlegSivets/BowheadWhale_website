import React from 'react'
import { useContext } from 'react'
import { MainContext } from '../../contex/MainContext'
import ImageItem from '../Items/ImageItem'

export default function UploadedFilesAres() {
  const {uploadedFiles} = useContext(MainContext)
  //TODO: create limit for files amount on page

  console.log('CURRENT_FILES: ', uploadedFiles)

  return (
    <div className='uploaded-files-area'>
      
        {uploadedFiles.length > 0 &&
        uploadedFiles.map((file, i) => (
          <ImageItem file={file} key={i}/>   
         ))}

       
    </div>
  )
}


//   {uploadedFiles.length > 0 ? 
    //   uploadedFiles.map((file, i) => (
    //     <ImageItem file={file} key={i}/>   
    //    )) :
    //   // <div>somethong to show</div> :  
    //   <div>Загрузите фото</div>
    // }