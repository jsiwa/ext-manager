import { useState, useEffect } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DensitySmallIcon from '@mui/icons-material/DensitySmall'
import Input from '@mui/material/Input'
import List from './List'
import Concise from './Concise'
import Loading from './Loading'

import "../style.css"
import './popup.css'

type ListType = 'list' | 'icon'

const { management } = chrome

function IndexPopup() {
  const [allExts, setAllExts] = useState<chrome.management.ExtensionInfo[]>()
  const [exts, setExts] = useState<chrome.management.ExtensionInfo[]>()
  const [listType, setListType] = useState<ListType>('list')
  
  useEffect(() => {
    management.getAll((extensions) => {
      setExts(extensions)
      setAllExts(extensions)
    })
  }, [])

  function changeEnable (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
    const { target } = e
    const id = target.getAttribute('id')
    management.setEnabled(
      id,
      checked,
      function () {
        const newExts = exts.map(item => {
          if (item.id === id) {
            item.enabled = checked
          }
          return item
        })
        setExts(newExts)
      }
    )
  }

  function search (e: React.KeyboardEvent<HTMLInputElement>) {
    if (allExts === null) return
    const value = e.currentTarget.value
    if (value) {
      setExts(allExts.filter(item => new RegExp(value, 'i').test(`${item.name}${item.description}`)))
      return
    }
    setExts(allExts)
    console.log(e.currentTarget.value)
  }

  return (
    <div className='popup'>
      <div className='popup-head'>
        <span className={`popup-head-ctrl${listType === 'list' ? ' active' : ''}`} onClick={() => { setListType('list') }}>
          <DensitySmallIcon />
        </span>
        <span className={`popup-head-ctrl${listType === 'icon' ? ' active' : ''}`} onClick={() => { setListType('icon') }}>
          <DashboardIcon />
        </span>
      </div>
      {
        exts ?
          <>
            <div className='m-4'>
              <Input className='w-full' placeholder='搜索插件' onKeyUp={search} />
            </div>
            {
              listType === 'list' ?
                <List exts={exts} changeEnable={changeEnable} /> : <Concise exts={exts} changeEnable={changeEnable} />
            }
          </>
        : 
        <Loading />
      }
    </div>
  )
}

export default IndexPopup
