import './App.css';
import DragArea from './components/Areas/DragArea';
import MainContextProvider from './contex/MainContext';
import HeaderArea from './components/Areas/header/HeaderArea';
import UploadedFilesArea from './components/Areas/UploadedFilesArea';
import UploadLabelArea from './components/Areas/UploadLabelArea';
import UploadManageArea from './components/Areas/UploadManageArea';
import ResultDataArea from './components/Areas/ResultDataArea';

function App() {
  return (
    <MainContextProvider>
      <HeaderArea />
      <div className='data-mage-area'>
        <div className='files-control-area'>
          <UploadManageArea />
          <DragArea />
          <UploadLabelArea />
        </div>
        <ResultDataArea />
      </div>
      <UploadedFilesArea />
    </MainContextProvider>
  );
}

export default App;
