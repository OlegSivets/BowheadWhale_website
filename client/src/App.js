import React, { useState, useEffect } from 'react';
import DragArea from './components/Areas/DragArea';
import ButtonFileUpload from './components/Buttons/FileUploadButton';
import MainContextProvider from './contex/MainContext';
import './App.css';
import DataSendButton from './components/Buttons/DataSendButton';
import HeaderArea from './components/Areas/HeaderArea';
import UploadedFilesAres from './components/Areas/UploadedFilesAres';

function App() {
  return (
    <MainContextProvider>
      <HeaderArea />
      <section className='upload-section'>
        <ButtonFileUpload />
        <DataSendButton />
      </section>
      <DragArea />
      <UploadedFilesAres />
    </MainContextProvider>
  );
}

export default App;
