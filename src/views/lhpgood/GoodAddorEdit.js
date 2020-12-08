import React,{ useState } from 'react'

import {
  Form,
  Input,
  Select,
  Button,
  AutoComplete,
  InputNumber,
  Upload, 
  Switch
} from 'antd'

import { 
  GithubOutlined
} from '@ant-design/icons'

import { Formnav,UpLoadIcon } from '@/components'
import './style.scss'
import img from '@/utils/img'
import { fetchAddorEdit } from '@/utils/api'

const { Option } = Select

const { TextArea } = Input
const AutoCompleteOption = AutoComplete.Option

const formItemLayout = {
  labelCol: {
    sm: { span: 7 },
  },
  wrapperCol: {
    sm: { span: 10 },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 16,
      offset: 7,
    },
  },
}

export default props=> {
    const [autoCompleteResult, setAutoCompleteResult] = useState([])

    let [imageUrl, setImageUrl] = useState('')
    let [name,setName] = useState('add')

    const [form] = Form.useForm()

    // 图片上传
    const imgSuccess = e => {
      console.log('图片上传成功', e)
      if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
        setImageUrl(e.fileList[0].response.data.url)
      }
    }

    // 表单提交
    const onFinish = values => {
      console.log('Received values of form: ', values)
      values.img = imageUrl
      fetchAddorEdit(values).then(()=>{
        props.history.replace('/good')
      })
    }
  
  
  return (
    <div className='lhp-good'>
      <div className='lhp-nav'>
        <Formnav name={name}/>
      </div>
      <div className='lhp-form'>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
          }}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="商品名称"
            rules={[
              {required: true,message: '商品名称是必填!'},
              {max:20, message:'名称长度不能多于20个字'},
              {min:2, message:'名称长度不能少于2个字'}
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="desc"
            label="商品描述"
            rules={[
              {required: true,message: '商品描述是必填!'},
              {max:50, message:'描述长度不能多于20个字'},
              {min:10, message:'描述长度不能少于2个字'}
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="price"
            label="商品价格"
            rules={[
              {required: true,message: '商品价格是必填!'},
            ]}
          >
            <InputNumber min={1}  />
          </Form.Item>

          <Form.Item
            name="cate"
            label="商品类型"
            rules={[
              {required: true,message: '商品价格是必填!'},
            ]}
          >
            <Select
              style={{ width: 200 }}
              placeholder="选择商品类型"
            >
              <Option key='1' value="电脑">电脑</Option>
              <Option key='2' value="手机">手机</Option>
              <Option key='3' value="汽车">汽车</Option>
              <Option key='4' value="生活">生活</Option>
              <Option key='5' value="电器">电器</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label='商品图片'
            rules={[
              { required: true, message: '商品图片是必填!' }
            ]}
          >
            <Upload
              name="file"
              action={img.uploadUrl}
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              onChange={imgSuccess}
            >
              {
                imageUrl ?
                <img src={img.imgbaseUrl+imageUrl} alt="avatar" style={{ width: '100%' }} />
                : <UpLoadIcon />
              }
            </Upload>
          </Form.Item>

          <Form.Item
            name="hot"
            label="是否热销"
            valuePropName='checked'
          >
            <Switch />
          </Form.Item>
          
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              提交
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