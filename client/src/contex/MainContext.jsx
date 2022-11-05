import { createContext } from "react"
import { useState } from "react"
import { permittedTypes } from '../constants/constants'

export const MainContext = createContext()

const MainContextProvider = ({children}) => {
    const [uploadedFiles, setUploadedFiles] = useState([])

    const uploadNewFiles = (files) =>{
      files = files.filter(elem => permittedTypes.includes(elem['type']))
      console.log('uploaded files: ', files)
      
      if (uploadedFiles.length > 0) {
        for (let i = 0; i < files.length; i++){
          (!uploadedFiles.find(elem => elem['name'] === files[i]['name'])
            && setUploadedFiles([...uploadedFiles, files[i]]))
        }
      } else {
        setUploadedFiles(files)
      }
    }

    const removeUploadedFile = (file) => {
      setUploadedFiles(uploadedFiles.filter(elem => elem['name'] != file['name']))
    }

    const sendFilesData = (data) => {
        console.log('DATA: ', data)

        const formData = new FormData();
        for (let i = 0; i < data.length; i++) {
          formData.append('file_' + i, data[i]);
        }
    
        const options = {
          method: 'POST',
          body: formData,
        };

        // TODO: handle data fetch
        fetch('/files', options).then(Request =>
          Request.json().then(req => {
            console.log(req)
            // create files array
            // setUploadedFiles(files)
            // download files
          })
        );
    }
    return (
        <MainContext.Provider value = {{
            uploadedFiles,
            setUploadedFiles,
            setUploadedFiles,
            sendFilesData,
            uploadNewFiles,
            removeUploadedFile,
        }}>
        {children}
        </ MainContext.Provider>
    )
}

export default MainContextProvider