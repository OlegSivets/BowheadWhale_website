import React from 'react'
import FilesUploadButton from '../Buttons/FilesUploadButton'
import FilesDeleteButton from '../Buttons/FilesDeleteButton'
import DownloadButton from '../Buttons/DownloadButton'
import DataSendButton from '../Buttons/DataSendButton'
import FolderUploadButton from '../Buttons/FolderUploadButton'

export default function UploadManageArea() {
  return (
    <div className='upload-manage-section'>
        <FilesUploadButton />
        <FolderUploadButton/>
        <DataSendButton/>
        <FilesDeleteButton />
    </div>
  )
}
