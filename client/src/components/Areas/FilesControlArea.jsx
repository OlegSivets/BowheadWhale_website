import React from 'react'
import UploadLabelArea from './UploadLabelArea'
import UploadManageArea from './UploadManageArea'
import DragArea from './DragArea'

export default function FilesControlArea() {
  return (
    <div className='files-control-area'>
        <UploadManageArea />
        <DragArea />
        <UploadLabelArea />
    </div>
  )
}
