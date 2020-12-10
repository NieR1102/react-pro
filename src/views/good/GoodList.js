import React,{useEffect,useState} from 'react'
import { Table, Select,Space,Button,Row, Col,Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import {useDispatch,useSelector} from 'react-redux'
import action from '@/store/actions'
import img from '@/utils/img'
import moment from 'moment'
import {fetchGoodDel} from '@/utils/api'
const { Option } = Select
const { confirm } = Modal

export default props=>{
  const dispatch=useDispatch()
  const goodData=useSelector(store=>store.good.goodData)
  let [keys,setKeys]=useState('')
  let [filter,setFilter]=useState({
    page:1,
    size:3,
    text:'',
    hot:''
  })

  const cateSelect=(key,v)=>{
      console.log(key,v)
  }

  const filterChange=(k,v)=>{
      filter[k]=v
      if(k!=='page'){
        filter[page]=1
      } 
      setFilter(JSON.parse(JSON.stringify(filter)))
  }

  const rowDelete=row=>{
  const elem=<div style={{color:"red"}}>{row.name}</div>
    confirm({
      title:'确认',
      icon:<ExclamationCircleOutlined />,
      content: <div>你确定要删除 {elem} 吗？</div>,
      okText: '确定',
      cancelText: '取消',
      onOk(){
        fetchGoodDel({id:row._id}).then(()=>{
          setFilter(JSON.parse(JSON.stringify(filter)))
        })
      }
    })
   
  }

  const mulDelete=()=>{
    let id=''
    keys.map(elem=>{
      id+=';'+elem
    })
    fetchGoodDel({id}).then(()=>{
      setFilter(JSON.parse(JSON.stringify(filter)))
    })
  }

  const skipToEdit=row=>{
    props.history.push('/good/update/'+row._id)
  }

  useEffect(()=>{
    let params=filter
    dispatch(action.goodListAction(params))
    return undefined
  },[filter])
  
  const cates=useSelector(store=>store.good.cates.list)
  console.log('品类',cates,typeof cates,cates==true)
  useEffect(()=>{
    dispatch(action.cateListAction({}))
    return undefined
  },[])

  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      align:'center',
      render: (text,row) => {
        return (
          <div>
            <div style={{width:"80px",height:"80px"}}>
            <img src={img.imgBase+row.img} alt={row.name} style={{width:"100%",height:"100%"}} />
            </div>
            <a>{text}</a>
          </div>
        )
    }},
    {
      title: '商品描述',
      dataIndex: 'desc',
      key: 'desc',
      align:'center',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      align:'center',
      sorter:(a,b)=>(a.price-b.price),
      render:text=>{
        return (<div>
        {"￥"+text}
      </div>)}
    },
    {
      title: '是否热销',
      key: 'hot',
      align:'center',
      dataIndex: 'hot',
      render:(text)=>{
      return (<div><h2 style={{fontSize:"14px"}}>{text?'是':'否'}</h2></div>)
    }
    },
    {
      title: '上架时间',
      key: 'time',
      align:'center',
      render:text=>{
        return (
          <div>
            {moment(text).format('YYYY年MM月DD日')}
            {moment(text).format('HH时mm分s秒')}
          </div>
        )
      }
    },
    {
      title: '操作',
      align:'center',
      key: 'op',
      render: (text, row) => (
        <Space size="middle">
          <a onClick={()=>rowDelete(row)}>Delete</a>
          <a onClick={()=>skipToEdit(row)}>Edit</a>
        </Space>
      ),
    }
  ];

    return (
        <div>
            <Row>
            <Col  span={19} offset={1} align="left">
            <h2 style={{fontSize:"14px"}}>商品列表</h2>
            </Col>
            <Col  span={4} align="center">
            <Button 
            type="primary" 
            shape="round" 
            size="small"
            onClick={()=>props.history.push('/good/update/0')}
            >新增</Button>
            </Col>
            </Row>
            <Row>
            <Col  span={19} offset={1} align="center">
            <h4>商品筛选</h4>
            </Col>
            </Row>
            <Row>
              <Col span={8}>
                <span>品名：</span>
                <input type="text"/>
              </Col>
              <Col span={8}>
                <span>品类：</span>
                <Select style={{width:"160px"}} onChange={(text,v)=>cateSelect(text,v)}>
                <option>全部</option>
                  {cates &&　cates.map(elem=>(
                    <option 
                    key={elem._id} 
                    value={elem.cate}
                    >
                      {elem.cate_zh}
                    </option>
                  ))}
                </Select> 
              </Col>
              <Col span={8}>
                <span>热销：</span>
                <Select style={{width:"120px"}}>
                  <option value=""></option>
                </Select> 
              </Col>
            </Row>
            <Table 
              rowKey='_id'
              columns={columns} 
              dataSource={goodData?goodData.list:[]}
              pagination={{
                current: filter.page,
                total:goodData.total,
                defaultPageSize: filter.size,
                onChange: page=>filterChange('page', page),
                onShowSizeChange: (page,size)=>filterChange('size', size),
                pageSizeOptions: [2,5,10,15,20]
              }}
              rowSelection={{
                type: 'checkbox',
                onChange: keys=>setKeys(keys)
              }}
              footer={() => <Button size='small' onClick={()=>mulDelete()} type='danger'>批量删除</Button>}
              size='small'
              align='center'
            />
        </div>
    )
}
