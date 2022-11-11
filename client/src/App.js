import './App.css';
import DragArea from './components/Areas/DragArea';
import MainContextProvider from './contex/MainContext';
import HeaderArea from './components/Areas/header/HeaderArea';
import UploadedFilesArea from './components/Areas/UploadedFilesArea';
import UploadLabelArea from './components/Areas/UploadLabelArea';
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
