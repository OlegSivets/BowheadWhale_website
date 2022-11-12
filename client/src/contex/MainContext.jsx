import { createContext } from "react"
import { useState, useEffect } from "react"
import { permittedTypes } from '../constants/constants'
import * as Papa from 'papaparse';

export const MainContext = createContext()

const MainContextProvider = ({ children }) => {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [updateStatus, setUpdateStatus] = useState(true)
  const [resultState, setResultState] = useState(false)
  const [filesVisibility, setFileVisibility] = useState(false)
  const [resultData, setResultData] = useState()

  useEffect(() => {
    console.log('UPDATE:', updateStatus)
  }, [updateStatus, resultData])

  const uploadNewFiles = (files) => {
    if (resultState) {
      setResultState(false)
    }

    files = files.filter(elem => permittedTypes.includes(elem['type']))
    if (uploadedFiles.length > 0) {
      let tempFiles = []
      for (let i = 0; i < files.length; i++) {
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
      await fetch('/files', options).then(response => response.json()).then(res => console.log(res))
      await fetch('/result')
        .then(response => response = response.text())
        .then(responseText => {
          let data = Papa.parse(responseText)
          setResultData(data)
        })

      setUpdateStatus(true)
      setResultState(true)
    }
  }

  const downloadFiles = () => {
    if (resultState) {
      setResultState(false)
    }
    console.log('RESULT_DATA', resultData)
    var csvData = new Blob([Papa.unparse(resultData)], { type: 'text/csv;charset=utf-8;' });
    var csvURL = window.URL.createObjectURL(csvData);
    var tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'result_test.csv');
    tempLink.click();
  }

  return (
    <MainContext.Provider value={{
      uploadedFiles,
      setUploadedFiles,
      updateStatus,
      setUpdateStatus,
      resultState,
      setResultState,
      filesVisibility,
      setFileVisibility,
      resultData,
      setResultData,
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