import './App.css';
import DragArea from './components/Areas/DragArea';
import FilesUploadButton from './components/Buttons/FilesUploadButton';
import MainContextProvider from './contex/MainContext';
import HeaderArea from './components/Areas/header/HeaderArea';
import UploadedFilesArea from './components/Areas/UploadedFilesArea';
import UploadLabelArea from './components/Areas/UploadLabelArea';
import DownloadButton from './components/Buttons/DownloadButton';
import FilesDeleteButton from './components/Buttons/FilesDeleteButton';
import UploadManageArea from './components/Areas/UploadManageArea';

function App() {
  return (
    <MainContextProvider>
      <HeaderArea />
      <UploadManageArea />
      <DragArea />
      <UploadLabelArea />
      <UploadedFilesArea />
    </MainContextProvider>
  );
}

export default App;
