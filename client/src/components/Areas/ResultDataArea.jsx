import React from 'react'
import { useContext } from 'react'
import { MainContext } from '../../contex/MainContext'
import DownloadButton from '../Buttons/DownloadButton'
import ResultTable from '../Items/ResultTable'

export default function ResultDataArea() {
  const {resultState} = useContext(MainContext)

  return (
    <div className='result-data-area' disabled={resultState ? "" : "disabled"}>
    {resultState ? 
        <>
            <ResultTable />
            <DownloadButton/>
        </>:
        <label className='result-label'>Загрузите и обработайте файлы для получения результата</label>      
    }
    </div>
  )
}
