import { Alert, Card } from "antd"

export default () => {
  return (
    <Card>
      <Alert
        message={"欢迎进入用户中心管理系统"}
        type="success"
        showIcon
        banner
        style={{
          marginBottom: 24,
        }}
      />
    </Card>
  )
}
