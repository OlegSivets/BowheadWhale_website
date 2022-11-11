import React from 'react'
import FilesUploadButton from '../Buttons/FilesUploadButton'
import FilesDeleteButton from '../Buttons/FilesDeleteButton'
import DownloadButton from '../Buttons/DownloadButton'

export default function UploadManageArea() {
  return (
    <div className='upload-manage-section'>
        <FilesUploadButton />
        <div>
          <DownloadButton />
          <FilesDeleteButton />
        </div>
    </div>
  )
}
