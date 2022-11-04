import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [drag, setDrag] = useState(false);

  useEffect(() => {
    fetch('/data')
      .then(response => response.json())
      .then(res => {
        console.log('test data fetching', res);
        setData(res);
      });
  }, []);

  function dragHandler(e, state) {
    e.preventDefault(e);
    setDrag(state);
  }

  function onDropHandler(e) {
    e.preventDefault(e);
    let files = [...e.dataTransfer.files];
    console.log(files);
  }

  return (
    <>
      <div>
        test data fetching
        {typeof data.elems === 'undefined' ? (
          <p>Loading...</p>
        ) : (
          data.elems.map((elem, i) => <p key={i}>{elem}</p>)
        )}
      </div>
      <div>
        {drag ? (
          <div
            className='drop-area'
            onDragStart={e => dragHandler(e, true)}
            onDragLeave={e => dragHandler(e, false)}
            onDragOver={e => dragHandler(e, true)}
            onDrop={e => onDropHandler(e)}>
            Отпустите файлы, чтобы загрузить
          </div>
        ) : (
          <div
            className='drop-area'
            onDragStart={e => dragHandler(e, true)}
            onDragLeave={e => dragHandler(e, false)}
            onDragOver={e => dragHandler(e, true)}>
            Перетащите файлы в область загрузки
          </div>
        )}
      </div>
    </>
  );
}

export default App;
