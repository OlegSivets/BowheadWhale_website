import { createContext } from "react"
import { useState } from "react"

export const MainContext = createContext()

const MainContextProvider = ({children}) => {
    const [uploadedFiles, setUploadedFiles] = useState([])

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
        fetch('/files', options).then(Request =>
          Request.json().then(req => console.log(req))
        );
    }
    return (
        <MainContext.Provider value = {{
            uploadedFiles,
            setUploadedFiles,
            sendFilesData
        }}>
        {children}
        </ MainContext.Provider>
    )
}

export default MainContextProvider