import { history } from "umi"
import { ReactElement, createElement, useState } from "react"
import { Menu, Layout } from "antd"
import { RightOutlined, LeftOutlined } from "@ant-design/icons"
import { routes } from "@/config/routes"
import { getRouteNameByPath } from "@/utils"
import styles from "./index.less"
import { TabType } from "@/layouts/type"

const { Sider, Header } = Layout
const siderWidth = 228

interface SideMenuProps {
  openedTabs: TabType[]
  setOpenedTabs: (tabs: TabType[]) => void
  activePath: string
  setActivePath: (path: string) => void
  componentMap: Record<string, ReactElement>
}

export default ({ openedTabs, setOpenedTabs, activePath, setActivePath, componentMap }: SideMenuProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const [openedKeys, setOpenedKeys] = useState<string[]>([])

  /**
   * 点击菜单，如果 openedTabs 中没有，就添加到 openedTabs 并激活并跳转到点击的菜单页面
   * 如果 openedTabs 已存在，就激活并跳转到点击的菜单页面
   * @param {*} menu
   */
  const onMenuSelect = (menu: any) => {
    const result = openedTabs.filter(item => item.key === menu.key)
    if (result.length === 0) {
      const newTab = { label: getRouteNameByPath(menu.key), key: menu.key, path: menu.path, children: componentMap[menu.key] }
      setOpenedTabs([...openedTabs, newTab])
    }
    setActivePath(menu.key)
    history.push(menu.key)
  }

  return (
    <Sider width={siderWidth} trigger={null} collapsible collapsed={collapsed} theme="light" style={{ overflow: "auto", position: "relative" }}>
      <Menu
        openKeys={openedKeys}
        selectedKeys={[activePath]}
        theme="light"
        mode="inline"
        style={{ border: "none", height: "100%" }}
        items={routes}
        onSelect={onMenuSelect}
        onOpenChange={keys => {
          setOpenedKeys(keys)
        }}
      />
      <Header className={styles.collapsed_icon_wrapper} style={{ padding: 0, left: collapsed ? 68 : siderWidth - 16 }} onClick={() => setCollapsed(!collapsed)}>
        {createElement(collapsed ? RightOutlined : LeftOutlined, {})}
      </Header>
    </Sider>
  )
}
