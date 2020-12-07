import React,{useState} from 'react'

import './style.scss'
import { 
  PageHeader,
  Breadcrumb
} from 'antd'


const Lhpnav = props=>{

  function Navname() {
    switch (props.name) {
      case 'home':
        return (
          <div>
              <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
              </Breadcrumb>
              <div className='breadcrumb-name'>
                <h1>工作台</h1>
              </div>
          </div>
        )
        break
      case 'list':
        return (
          <div>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>商品列表</Breadcrumb.Item>
              </Breadcrumb>
              <div className='breadcrumb-name'>
                <h1>商品列表</h1>
              </div>
          </div>
        )
      break
      case 'add':
        return (
          <div>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="">商品列表</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>商品新增</Breadcrumb.Item>
              </Breadcrumb>
              <div className='breadcrumb-name'>
                <h1>商品新增</h1>
              </div>
          </div>
        )
        break
      default:
        return(
          <div>
              <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
              </Breadcrumb>
          </div>
        )
    }
  }
  return (
    <div>
      <Navname/>
    </div>
  )
}

export default props=> {
  console.log('formnav', props.name)  
  return (
    <div className='lhp-breadcrumb'>
      <Lhpnav name={props.name}/>
      
    </div>
  )
}
