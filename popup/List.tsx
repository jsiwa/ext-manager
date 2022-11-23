import React from 'react'
import Switch from '@mui/material/Switch'
import Link from '@mui/material/Link'

interface Props {
  exts: chrome.management.ExtensionInfo[],
  changeEnable: (e:React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
}

function createTab (url: string) {
  chrome.tabs.create({
    url
  })
}

const List: React.FC<Props> = (props) => {
  return (
    <div className="list">
      {
        props.exts.map(item => <div className='ext-item' key={item.id}>
          <div className='item-head'>
            <img width='16' height='16' src={ item.icons[item.icons.length - 1].url } /> 
            <h3>{item.name}</h3>
            {/* {
              item.shortName ?
              <h6>{item.shortName}</h6>
              : ''
            } */}
            <Link style={{marginRight: 10}} onClick={() => { createTab(`chrome://extensions/?id=${item.id}`) }}>moreInfo</Link>
            <Switch 
              color='primary'
              size='small'
              checked={item.enabled} 
              onChange={props.changeEnable}
              inputProps={{ id: item.id }}
            />
          </div>
          <div className='item-description'>{item.description}</div>
          {
            item.homepageUrl ? <Link href={ item.homepageUrl } /> : ''
          }
          <div className="item mt-2">
            <strong>permissions: </strong>[{item.permissions.join(', ')}]
          </div>
          <div className="item mt-2">
            <strong>version: </strong>{item.version}
          </div>
          <div className="item mt-2">
            <strong>installType: </strong>{item.installType}
          </div>
          <div className="item mt-2">
            <strong>mayDisable: </strong>{item.mayDisable ? 'true' : 'false'}
          </div>
          <div className="item mt-2">
            <strong>offlineEnabled: </strong>{item.offlineEnabled ? 'true' : 'false'}
          </div>
          <div className="item mt-2">
            <strong>type: </strong>{item.type}
          </div>
          {
            item.availableLaunchTypes && item.availableLaunchTypes.length ?
            <div className="item mt-2">
              <strong>availableLaunchTypes: </strong>{item.availableLaunchTypes.join(',')}
            </div>
            : ''
          }
          {
            item.optionsUrl ?
            <div className="item mt-2">
              <strong>optionsUrl: </strong>
              <Link onClick={() => {createTab(item.optionsUrl)}}>{item.optionsUrl}</Link>
            </div>
            : ''
          }
          {
            item.installType === 'normal' ?
            <div className="item mt-2">
              <strong>应用商店: </strong> <Link target="_blank" href={`https://chrome.google.com/webstore/detail/${item.id}`}>打开</Link>
            </div>
            : ''
          }
          {
            item.hostPermissions.length ?
            <div className="item mt-2">
              <strong>hostPermissions: </strong>[{item.hostPermissions.join(', ')}]
            </div> : ''
          }
          {
            item.disabledReason ?
            <div className="item mt-2">
              <strong>disabledReason: </strong>{item.disabledReason}
            </div>
            : ''
          }
          {
            item.appLaunchUrl ?
            <div className="item mt-2">
              <strong>appLaunchUrl: </strong>{item.appLaunchUrl}
            </div>
            : ''
          }
          {
            item.updateUrl ?
            <div className="item mt-2">
              <strong>updateUrl: </strong>{item.updateUrl}
            </div>
            : ''
          }
          <div className='item-id'>
            id: {item.id}
          </div>
        </div>)
      }
    </div>
  )
}

export default List