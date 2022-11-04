import React from 'react'
import { useState, useContext } from 'react';
import { MainContext } from '../contex/MainContext';

export default function DragArea() {
    const [drag, setDrag] = useState(false)
    const {setUploadedFiles} = useContext(MainContext)


    function dragHandler(e, state) {
        e.preventDefault(e);
        setDrag(state);
      }
    
    function onDropHandler(e) {
      e.preventDefault(e);
      let files = [...e.dataTransfer.files];
      console.log(files);
      
      // TODO: add only new files to files state in context 
      setUploadedFiles(files)
      console.log('files were upload')
    }

    return (
        <div> {drag ? (
            <div
              className='drop-area'
              onDragStart={e => dragHandler(e, true)}
              onDragLeave={e => dragHandler(e, false)}
              onDragOver={e => dragHandler(e, true)}
              onDrop={e => onDropHandler(e)}>
              Отпустите файлы, чтобы загрузить
            </div>
          ) : (
            <div
              className='drop-area'
              onDragStart={e => dragHandler(e, true)}
              onDragLeave={e => dragHandler(e, false)}
              onDragOver={e => dragHandler(e, true)}>
              Перетащите файлы в область загрузки
            </div>
          )}
          </div>
    )
}
