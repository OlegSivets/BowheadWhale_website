import { createContext } from "react"
import { useState, useEffect } from "react"
import { permittedTypes } from '../constants/constants'

export const MainContext = createContext()

const MainContextProvider = ({children}) => {
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [updateStatus, setUpdateStatus] = useState(true)
    const [resultState, setResultState] = useState(false)

    useEffect(() => {
      console.log('UPDATE:', updateStatus)
    }, [updateStatus])

    const uploadNewFiles = (files) =>{
      if (resultState) {
        setResultState(false)
      }

      files = files.filter(elem => permittedTypes.includes(elem['type']))

      if (uploadedFiles.length > 0) {
        let tempFiles = []
        for (let i = 0; i < files.length; i++){
          (!uploadedFiles.find(elem => elem['name'] === files[i]['name']) && 
            tempFiles.push(files[i]))
        }
        setUploadedFiles([...uploadedFiles, ...tempFiles])
      } else {
        setUploadedFiles(files)
      }
    }

    const removeUploadedFile = (file) => {
      setUploadedFiles(uploadedFiles.filter(elem => elem['name'] != file['name']))
    }

    const sendFilesData = async () => {
      console.log('DATA: ', uploadedFiles)

      if (uploadedFiles.length == 0) {
        console.log('NO FILES WERE SELECTED')
      } else {
        setUpdateStatus(false)
        const formData = new FormData();
        for (let i = 0; i < uploadedFiles.length; i++) {
          formData.append('file_' + i, uploadedFiles[i]);
        }
  
        const options = {
          method: 'POST',
          body: formData,
        };
        const fileNames = await fetch('/files', options).then(Request => Request.json())
        let promises = []
        for (let i = 0; i < fileNames.length; i++) {
          promises.push(await fetch('/' + fileNames[i]).then(res => res.blob().then(res =>
            res = new File([res],  fileNames[i])
          )))
        }
        setUploadedFiles(promises)
        setUpdateStatus(true)
        setResultState(true)
      }
    }

    const downloadFiles = () => {
      if (resultState) {
        setResultState(false)
      }
      const FileSaver = require('file-saver');
      const zip = require('jszip')();

      for (let i = 0; i < uploadedFiles.length; i++){
        zip.file(uploadedFiles[i].name, uploadedFiles[i])
      }

      zip.generateAsync({type: "blob"}).then(content => {
        FileSaver.saveAs(content, "images.zip");
      });
    }

    return (
        <MainContext.Provider value = {{
            uploadedFiles,
            setUploadedFiles,
            updateStatus,
            setUpdateStatus,
            resultState,
            setResultState,
            sendFilesData,
            uploadNewFiles,
            removeUploadedFile,
            downloadFiles,
        }}>
        {children}
        </ MainContext.Provider>
    )
}

export default MainContextProvider