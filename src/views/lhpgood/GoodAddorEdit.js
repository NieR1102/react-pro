import React,{ useState,useEffect } from 'react'

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
import action from '@/store/actions'
import { useDispatch,useSelector } from 'react-redux'
import { fetchAddorEdit } from '@/utils/api'
import CateSelect from './components/CateSelect'


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
    const dispatch = useDispatch()
    const goodInfo = useSelector(store=>store.good.goodInfo)

    let [imageUrl, setImageUrl] = useState('')
    let [values, setValues] = useState('')
    const [flag, setFlag] = useState(false) // 是否已经填充表单

    const id = props.match.params.id
    const isAdd = id=== '0'
    const [form] = Form.useForm()
    
    // 当Form表单值发生变化时，我们手动取值，赋值给声明式变量 values
    const formChange = values => {
      setValues(values)
    }
    // 图片上传
    const imgSuccess = e => {
      console.log('图片上传成功', e)
      if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
        setImageUrl(e.fileList[0].response.data.url)
      }
    }

    // 渲染编辑表单
    useEffect(()=>{
      if(!flag)form.setFieldsValue(goodInfo)

      if(goodInfo._id) setFlag(true)
      return undefined
    })

    // 请求商品详情的数据
    useEffect(()=>{
      if(!isAdd)dispatch(action.goodDetailAction({id}))
      return ()=>{
        // 当组件销毁时，清空redux state
        dispatch(action.clearAction())
      }
    },[])

    // 表单提交
    const onFinish = values => {
      values.img = (imageUrl||goodInfo.img) 
      if(!isAdd) values.id = goodInfo._id
      fetchAddorEdit(values).then(()=>{
        props.history.replace('/good')
      })
    }
  
  
  return (
    <div className='lhp-good'>
      <div className='lhp-nav'>
        <Formnav name={id}/>
      </div>
      <div className='lhp-form'>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
          onValuesChange={(val, values)=>formChange(values)}
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
              {min:5, message:'描述长度不能少于2个字'}
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
            <CateSelect

            />
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
                (imageUrl||goodInfo.img) ?
                <img src={img.imgbaseUrl+(imageUrl||goodInfo.img)} alt="avatar" style={{ width: '100%' }} />
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
              {
                id==0? '提交' : '提交修改' 
              }
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