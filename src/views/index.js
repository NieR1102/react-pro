import loadable from '@loadable/component'
import {
  DotChartOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const ReduxHome = loadable(()=>import('./lhppro/ReduxHome'))
const ReduxUser = loadable(()=>import('./lhppro/ReduxUser'))
const ReduxFrom = loadable(()=>import('./lhppro/ReduxFrom'))


export default [ // eslint-disable-line
  {
    id: 11,
    text: '概况管理',
    icon: <DotChartOutlined />,
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
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1201,
        text: '首页',
        path: '/home',
        component: ReduxHome
      },
      {
        id: 1202,
        text: '个人中心',
        path: '/user',
        component: ReduxUser
      },
      {
        id: 1203,
        text: '表单',
        path: '/from',
        component: ReduxFrom
      }
    ]
  }
]
