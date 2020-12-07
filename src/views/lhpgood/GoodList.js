import React,{ useState } from 'react'

import { Formnav } from '@/components'
import './style.scss'

import { 
  Input,
  Form,
  Row,
  Col, 
  Select
} from 'antd'

import { AudioOutlined } from '@ant-design/icons'

const { Option } = Select

export default props=> {
  let [name,setName] = useState('list')
  return (
    <div className='lhp-list'>
      <div className='lhp-nav'>
        <Formnav name={name}/>
      </div>
      <div className='list-inquire'>
        <Form>
          <Row align='middle' >
            <Col span={4} offset={1}>
              <Form.Item
                label="商品名称"
                name="name"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} offset={1}>
              <Form.Item
                label="商品描述"
                name="dsec"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item
                label="商品类型"
                name="username"
              >
                 <Select
                    style={{ width: 160 }}
                    placeholder="选择商品类型"
                  >
                    <Option key='1' value="电脑">电脑</Option>
                    <Option key='2' value="手机">手机</Option>
                    <Option key='3' value="汽车">汽车</Option>
                    <Option key='4' value="生活">生活</Option>
                    <Option key='5' value="电器">电器</Option>
                  </Select>
              </Form.Item>
            </Col>
            <Col span={4} >
              <Form.Item
                label="日期"
                name="dsec"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}
