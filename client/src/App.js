import React, { useState, useEffect } from 'react';
import DragArea from './components/Areas/DragArea';
import ButtonFileUpload from './components/Buttons/FileUploadButton';
import MainContextProvider from './contex/MainContext';
import './App.css';
import DataSendButton from './components/Buttons/DataSendButton';
import HeaderArea from './components/Areas/HeaderArea';
import UploadedFilesAres from './components/Areas/UploadedFilesAres';
import UploadLabelArea from './components/Areas/UploadLabelArea';
import DownloadButton from './components/Buttons/DownloadButton';

function App() {
  return (
    <MainContextProvider>
      <HeaderArea />
      <section className='upload-section'>
        <ButtonFileUpload />
        <div>
          <DownloadButton />
          <DataSendButton />
        </div>
      </section>
      <DragArea />
      <UploadLabelArea />
      <UploadedFilesAres />
    </MainContextProvider>
  );
}

export default App;
