import loadable from '@loadable/component'
import {
  HomeOutlined,
  AppleOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const Home = loadable(()=>import('./lhphome/Home'))
const GoodList = loadable(()=>import('./lhpgood/GoodList'))
const GoodAddorEdit = loadable(()=>import('./lhpgood/GoodAddorEdit'))


export default [ // eslint-disable-line
  {
    id: 11,
    text: '概况管理',
    icon: <HomeOutlined />,
    children: [
      {
        id: 1111,
        text: '学习Redux',
        path: '/',
        component: ReduxStudy
      }
    ]
  },
  {
    id: 12,
    text: '三有鹿',
    icon: <AppleOutlined />,
    children: [
      {
        id: 1201,
        text: '首页',
        path: '/home',
        component: Home
      },
      {
        id:1202,
        text:'商品列表',
        path:'/good',
        component: GoodList,
        children: [
          {
            id:120201,
            text:'商品新增',
            path:'/good/addoredit',
            component: GoodAddorEdit
          },
        ]
      }
    ]
  }
]
