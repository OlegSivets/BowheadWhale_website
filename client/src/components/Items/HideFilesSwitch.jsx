import React from 'react'
import { useContext } from 'react'
import { MainContext } from '../../contex/MainContext'

export default function HideFilesSwitch() {
  const { filesVisibility, setFileVisibility } = useContext(MainContext)

  const handleCheckboxClicked = () => {
    setFileVisibility(!filesVisibility)
  }

  return (
    <div className='switch-area'>
      <label className='switch-label'>Отображение файлов</label>
      <label className="switch">
          <input type="checkbox" onClick={handleCheckboxClicked}/>
          <span className="slider round"></span>
      </label>
    </div>
  )
}
