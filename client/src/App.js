import './App.css';
import DragArea from './components/Areas/DragArea';
import MainContextProvider from './contex/MainContext';
import HeaderArea from './components/Areas/header/HeaderArea';
import UploadedFilesArea from './components/Areas/UploadedFilesArea';
import UploadLabelArea from './components/Areas/UploadLabelArea';
import UploadManageArea from './components/Areas/UploadManageArea';
import ResultDataArea from './components/Areas/ResultDataArea';
import FilesControlArea from './components/Areas/FilesControlArea';
import DataManageArea from './components/Areas/DataManageArea';

function App() {
  return (
    <MainContextProvider>
      <HeaderArea />
      <DataManageArea />
      <UploadedFilesArea />
    </MainContextProvider>
  );
}

export default App;
