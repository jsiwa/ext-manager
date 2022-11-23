import React from 'react'
import Switch from '@mui/material/Switch'

interface Props {
  exts: chrome.management.ExtensionInfo[],
  changeEnable: (e:React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
}
const List: React.FC<Props> = ({
  exts,
  changeEnable,
}) => {
  return (
    <div className="concise-list">
      {
        exts.map(item => <div className='ext-item-concise' key={item.id}>
          <img width='32' height='32' src={ item.icons[item.icons.length - 1].url } /> 
          <h3>{item.name}</h3>
          <Switch 
            color='primary'
            size='small'
            checked={item.enabled} 
            onChange={changeEnable}
            inputProps={{ id: item.id }}
          />
        </div>)
      }
    </div>
  )
}

export default List