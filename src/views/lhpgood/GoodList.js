import React,{ useState,useEffect } from 'react'

import { useDispatch,useSelector } from 'react-redux'

import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import { Formnav } from '@/components'
import './style.scss'
import action from '@/store/actions'
import img from '@/utils/img'
import api from '@/utils/api'
import CateSelect from './components/CateSelect'

import { 
  ConfigProvider,
  Input,
  Row,
  Col, 
  Select,
  DatePicker, 
  Space,
  Button,
  Table,
  Modal
} from 'antd'
const { Option } = Select
const { confirm } = Modal

import { ExclamationCircleOutlined } from '@ant-design/icons'


const { RangePicker } = DatePicker


export default props=> {

  const dispatch = useDispatch()
  const goodData = useSelector(store=>store.good.goodData)
  const cates = useSelector(store=>store.good.cates)

  let [name,setName] = useState('list')
  let [text, setText] = useState('')
  let [keys, setKeys] =useState([])

  let [filter, setFilter] = useState({
    size: 2,
    page: 1,
    text: '',
    hot: ''
  })

  const textChange = val => {
    console.log('value text', val)
    setText(val)
    if(!val) {
      filter.text = ''
      setFilter(JSON.parse(JSON.stringify(filter)))
    }
  }

  const filterChange = (key, val) => {
    filter[key] = val
    console.log('filterChange',key)
    if(key!=='page') filter.page = 1
    setFilter(JSON.parse(JSON.stringify(filter)))
  }

  const onSelectChange = keys => {
    setKeys(keys)
  }

  // 删除操作
  const handleDel = row => {
    const ele = <span style={{color: 'red'}}>{row.name}</span>
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: <div>你确定要删除 {ele} 吗？</div>,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        api.fetchGoodDel({id:row._id}).then(()=>{
          setFilter(JSON.parse(JSON.stringify(filter)))
        })
      }
    })
  }

  //批量删除
  const mulDelete = row => {
    let id =''
    keys.map(ele=>id+=(';'+ele))
    // 向后端传递由 id 组成的字符串，不能传数组
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: <div>你确定要删除 {id} 吗？</div>,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        api.fetchGoodDel({id}).then(()=>{
          setFilter(JSON.parse(JSON.stringify(filter)))
        })
      }
    })
    
  }

  // 编辑
  const skipToEdit = row =>{
    props.history.push('/good/addoredit/'+(row?row._id : 0))
  }

  const rowSelection = {
    keys,
    onChange: onSelectChange,
  }

  useEffect(()=>{
    dispatch(action.goodListAction(filter))
    return undefined
  },[filter])

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text,row,idx) => {
        return(
          <div className='good-img'>
            <img src={img.imgbaseUrl+row.img} alt={text}/>
            <a>{text}</a>
          </div>
        )
      },
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      key: 'desc',
      align: 'center',
      ellipsis:'true',
      render: (text)=>( <div className='good-desc'>{text}</div> )
    },
    {
      title: '商品类型',
      key: 'cate',
      dataIndex: 'cate',
      align: 'center',
      render: cate=>{
        const idx = cates.findIndex(ele=>ele.cate===cate)
        return <span>{idx>=0?cates[idx].cate_zh:''}</span>
      }
    },
    {
      title: '商品价格',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      sorter: (a, b) => a.price - b.price,
      render: (text)=><span>￥{text}</span>
    },
    {
      title: '是否热销',
      dataIndex: 'hot',
      key: 'hot',
      align: 'center',
      render: text=><span>{text?'是':'否'}</span>
    },
    {
      title: '上架时间',
      dataIndex: 'create_time',
      key: 'create_time',
      align: 'center',
      render: text=> {
        return(
          <>
            <div>{moment(text).format('YYYY-MM-DD ')}</div>
            <div>{moment(text).format('HH:MM:SS')}</div>
          </>
        )
      }
    },
    {
      title: '操作',
      key: 'tags',
      dataIndex: 'tags',
      align: 'center',
      render: (text, row) => (
        <Space size="middle">
          <a onClick={()=>handleDel(row)}>删除</a>
          <a onClick={()=>skipToEdit(row)}>编辑</a>
        </Space>
      ),
    },
  ]
  
  return (
    <div className='lhp-list'>
      <div className='lhp-nav'>
        <Formnav name={name} />
      </div>
      <div className='list-inquire'>
          <Row align='middle' >
            <Col span={2}>
              <span className="turn-right">商品名称：</span>
            </Col>
            <Col span={4}>
              <Input
                value={text}
                onChange={e=>textChange(e.target.value)}
                placeholder="搜索"
                allowClear
                onPressEnter={e=>filterChange('text', e.target.value)}
              />
            </Col>
            <Col span={2}>
              <span className="turn-right">商品类型：</span>
            </Col>
            <Col span={4}>
              <CateSelect
                hasAll
                onChange={cate=>filterChange('cate', cate)}
                allowClear
                value={filter.cate}
              />
            </Col>
            <Col span={2}>
              <span className="turn-right">上架日期：</span>
            </Col>
            <Col span={4}>
                <Space direction="vertical" size={12}>
                  <ConfigProvider locale={zhCN}>
                    <RangePicker />
                  </ConfigProvider>
                </Space>
            </Col>
            <Col span={1}>
              <span className="turn-right">状态：</span>
            </Col>
            <Col span={3}>
                
            </Col>
            <Col span={2}>
              <Button type="primary" onClick={()=>props.history.push('/good/addoredit/0')}>新增</Button>
            </Col>
          </Row>
      </div>
      <div className='lhp-good-list'>
        <div className='del-btn'>
          <Button size='small' onClick={()=>mulDelete()} type='danger'>
            批量删除
          </Button>
        </div>
        <Table 
          rowKey='_id'
          columns={columns} 
          dataSource={goodData.list} 
          rowSelection={rowSelection}
          pagination={{
            current: filter.page,
            total: goodData.total,
            defaultPageSize: filter.size,
            onChange: page=>filterChange('page', page),
            onShowSizeChange: (page, size)=>filterChange('size', size),
            pageSizeOptions: [2,5,10,15,20]
          }}
        />
      </div>
    </div>
  )
}
