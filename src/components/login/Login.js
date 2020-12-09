import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { 
  Form, 
  Input, 
  Button, 
  Checkbox 
} from 'antd'
import './style.scss'
import api from '@/utils/api'

import {GithubOutlined} from '@ant-design/icons'

import logo from '@/assets/img/iphone.svg'

const tailLayout1 = {
  wrapperCol: {
    offset: 4,
    span: 12,
  },
}

const tailLayout2 = {
  wrapperCol: {
    offset: 4,
    span: 18,
  },
}


export default props=> {

  const history = useHistory()

  const onFinish = (values) => {
    console.log('Success:', values)
    api.fetchLogin(values).then(res=>{
      if(res && res.token) {
        localStorage.setItem('token', res.token)

        history.replace('/')

        props.onLogin()
      }
    })
  }

  useEffect(()=>{
    location.href = '/#/login'
    return undefined
  }, [])
  
  return (
    <div className='lhp-login'>
      <div className='login-logo'>
        <img src={logo} alt="pg"/>
      </div>
      <div className='login-inner'>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            // label=" "
            {...tailLayout2}
            name="username"
            rules={[
              {
                required: true,
                message: '请输入你的用户名!',
              },
            ]}
          >
            <Input placeholder="用户名"/>
          </Form.Item>

          <Form.Item
            // label=' '
            {...tailLayout2}
            name="password"
            rules={[
              {
                required: true,
                message: '请输入你的密码!',
              },
            ]}
          >
            <Input.Password placeholder="密码"/>
          </Form.Item>

          <Form.Item {...tailLayout1} name="remember" valuePropName="checked">
            <Checkbox>记住密码</Checkbox>
            {/* <a>忘记密码</a> */}
          </Form.Item>
          
          <Form.Item {...tailLayout2}>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
      <footer>
        <p><a href="">Ant Design Pro</a><a href=""><GithubOutlined /></a><a href="">Ant Design</a></p>
        <p><a href="">Copyright  2020 蚂蚁集团体验技术部出品</a></p>
      </footer>
    </div>
  )
}
