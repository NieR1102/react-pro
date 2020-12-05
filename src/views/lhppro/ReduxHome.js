import React, { useEffect,useState } from 'react'

// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入饼图
import  'echarts/lib/chart/pie'

import Demo from './home/Demo'

import '@/assets/css/home.scss'
import { 
  PageHeader,
  Avatar,
  Image,
  Row,
  Col,
  Card
} from 'antd'

import {
  WechatOutlined,
  AlipayCircleOutlined,
  QqOutlined,
  WeiboOutlined,
  AppleOutlined,
  GithubOutlined
} from '@ant-design/icons'


const { Meta } = Card

const routes = [
  {
    path: 'index',
    breadcrumbName: '首页',
  },
  {
    path: 'first',
    breadcrumbName: 'Second-level Menu',
  },
  {
    path: 'second',
    breadcrumbName: '工作台',
  },
]


const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

export default prosp=> {
  
  useEffect(() => {
    
    var myChart = echarts.init(document.getElementById('main'))
    // 绘制图表
    const option = {
      backgroundColor: '#fff',
  
      title: {
          text: 'Customized Pie',
          left: 'center',
          top: 20,
          textStyle: {
              color: '#fff'
          }
      },
  
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
  
      visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
              colorLightness: [0, 1]
          }
      },
      series: [
          {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                  {value: 335, name: '直接访问'},
                  {value: 310, name: '邮件营销'},
                  {value: 274, name: '联盟广告'},
                  {value: 235, name: '视频广告'},
                  {value: 400, name: '搜索引擎'}
              ].sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',
              label: {
                  color: 'rgba(0, 0, 0, 0.3)'
              },
              labelLine: {
                  lineStyle: {
                      color: 'rgba(0, 0, 0, 0.3)'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
              },
              itemStyle: {
                  color: 'rgb(108, 172, 255)',
                  shadowBlur: 160,
                  shadowColor: 'rgba(0, 0, 0, 0)'
              },
  
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                  return Math.random() * 200;
              }
          }
      ]
    }
    myChart.setOption(option)
    // return undefined
  },[])

  return (
    <div className='lhp-home'>
      <div className='home-work'>
        <PageHeader
          className="site-page-header"
          title="工作台"
          breadcrumb={{ routes }}
        >
          <Row>
            <Col span={2}>
                <Avatar
                  size={72}
                  src={<Image src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />}
                />
            </Col>
            <Col span={10}>
              <p>早安，打工人，祝你开心每一天！</p>
              <p>交互专家 |蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</p>
            </Col>
            <Col span={6}></Col>
            <Col span={2}>
              <span className='solid'>
                <p>项目数</p>
                <span>111</span>
              </span>
            </Col>
            <Col span={2}>
              <span className='solid'>
                <p>团队内排名</p>
                <span>111</span>
              </span>
            </Col>
            <Col span={2}>
              <p>项目访问</p>
              <span>111</span>
            </Col>
          </Row>
        </PageHeader>
      </div>
      <Row justify="space-around">
        <Col span={16}>
          <div className='lhp-card-left'>
            <Card title="进行中的项目" extra={<a href="#">更多项目</a>}>
              <Card.Grid style={gridStyle}>
                <Meta
                  avatar={<Avatar icon={<WechatOutlined />} />}
                  title="王者荣耀"
                />
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Meta
                  avatar={<Avatar icon={<WechatOutlined />}  />}
                  title="和平精英"
                />
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Meta
                  avatar={<Avatar icon={<WechatOutlined />}  />}
                  title="QQ音乐"
                />
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Meta
                  avatar={<Avatar icon={<AppleOutlined />}  />}
                  title="苹果"
                />
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Meta
                  avatar={<Avatar icon={<QqOutlined />}  />}
                  title="QQ"
                />
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Meta
                  avatar={<Avatar icon={<WechatOutlined />}  />}
                  title="微信"
                />
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Meta
                  avatar={<Avatar  icon={<AlipayCircleOutlined />} />}
                  title="支付宝"
                />
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Meta
                  avatar={<Avatar icon={<WeiboOutlined />} />}
                  title="微博"
                />
              </Card.Grid>
            </Card>
            <div className='card-dynamic'>
              <Card title="动态" bordered={false} >
                <Demo/>
                <Demo/>
                <Demo/>
                <Demo/>
                <Demo/>
              </Card>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className='lhp-card-right'>
              <Card title="快速开始 / 便捷导航" bordered={false}>
                <span>首页</span>
                <span>表单</span>
                <span>个人中心</span>
              </Card>
              <div className='card-data'>
                <Card title="XX数据" bordered={false} >
                  <div id={'main'} style={{height: 400}}/>
                </Card>
              </div>
              <div className='card-data'>
                <Card title="团队" bordered={false} >
                  <p>
                    <span className='ejls'>
                      <a href="">
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png" alt=""/>
                        <span>二九三零</span>
                      </a>
                    </span>
                    <span className='ejls'>
                      <a href="">
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png" alt=""/>
                        <span>历代书法家</span>
                      </a>
                    </span>
                  </p>
                  <p>
                    <span className='ejls'>
                      <a href="">
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png" alt=""/>
                        <span>二九三零</span>
                      </a>
                    </span>
                    <span className='ejls'>
                      <a href="">
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png" alt=""/>
                        <span>历代书法家</span>
                      </a>
                    </span>
                  </p>
                  <p>
                    <span className='ejls'>
                      <a href="">
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png" alt=""/>
                        <span>二九三零</span>
                      </a>
                    </span>
                    <span className='ejls'>
                      <a href="">
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png" alt=""/>
                        <span>历代书法家</span>
                      </a>
                    </span>
                  </p>
                </Card>
              </div>
          </div>
        </Col>
      </Row>
      <footer>
        <p><a href="">Ant Design Pro</a><a href=""><GithubOutlined /></a><a href="">Ant Design</a></p>
        <p><a href="">Copyright  2020 蚂蚁集团体验技术部出品</a></p>
      </footer>
    </div>
  )
}
