import React, { useState, useEffect } from 'react';
import DragArea from './components/DragArea';
import ButtonFileUpload from './components/Buttons/FileUploadButton';
import MainContextProvider from './contex/MainContext';
import './App.css';
import DataSendButton from './components/Buttons/DataSendButton';

function App() {
  return (
    <>
      <p>Шуточно ищем кита</p>
      <MainContextProvider>
        <DragArea />
        <ButtonFileUpload />
        <DataSendButton />
      </MainContextProvider>
    </>
  );
}

export default App;
