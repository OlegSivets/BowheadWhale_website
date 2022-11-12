import React from 'react'
import { useContext } from 'react'
import { MainContext } from '../../contex/MainContext'

export default function ResultTable() {
  const { resultData } = useContext(MainContext)

  return (
    <div className='result-table-area'>
        <table className='result-table'>
            {resultData &&
                resultData.data.map((row, index) => 
                <tr key={index}>
                    <th>{row[0]}</th>
                    <th>{row[1]}</th>
                    <th>{row[2]}</th>
                    <th>{row[3]}</th>
                    <th>{row[4]}</th>
                    <th>{row[5]}</th>
                </tr>
            )}
        </table>
    </div>
  )
}
