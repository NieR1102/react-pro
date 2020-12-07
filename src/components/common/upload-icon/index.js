import {
  LoadingOutlined,
  PlusOutlined
} from '@ant-design/icons'

export default props=> {
  const { loading } = props
  return (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
}
