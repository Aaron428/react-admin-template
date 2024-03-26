import { useCallback, useState } from "react"
import { Button, Layout, Select, Space, Tabs, message } from "antd"
import PageTitle from "@/components/PageTitle"
import SiderMenu from "@/components/SiderMenu"
import { history, useLocation } from "umi"
import styles from "./index.less"
import type { TabType, CloseType } from "./type"
import { getComponentMap } from "@/config/routes"
import { getRouteNameByPath } from "@/utils"

const { Header } = Layout

const componentMap = getComponentMap()

export default () => {
  const { pathname } = useLocation()
  const newPathname = pathname === "/" ? "/welcome" : pathname

  const [closeType, setCloseType] = useState<CloseType>("left")
  const [activePath, setActivePath] = useState<string>(newPathname)
  const [openedTabs, setOpenedTabs] = useState<TabType[]>([
    {
      label: getRouteNameByPath(newPathname),
      key: newPathname,
      path: newPathname,
      children: componentMap[newPathname],
    },
  ])

  /**
   * 移除菜单之后，会默认跳转到当前的上一个菜单，
   * @param {*} targetKey 操作的 tab
   * @param {*} action 操作，目前只有移除
   */
  const onEditHandler = (targetKey: string, action: "remove" | "add") => {
    if (action === "remove") {
      const newTabs = openedTabs.filter(item => item.key !== targetKey)
      setOpenedTabs(newTabs)
      const newActivePath = newTabs[newTabs.length - 1].key
      setActivePath(newActivePath)
      history.push(newActivePath)
    }
  }

  /**
   * 根据类型关闭窗口
   * @returns
   */
  const clonseWindowsHandler = () => {
    const idx = openedTabs.findIndex(item => item.key === activePath)
    switch (closeType) {
      case "right":
        setOpenedTabs(openedTabs.slice(0, idx + 1))
        break
      case "left":
        setOpenedTabs(openedTabs.slice(idx))
        break
      case "other":
        setOpenedTabs(openedTabs.filter(item => item.key === activePath))
        break
      default:
        return
    }
    message.success("操作成功")
  }

  const onTabChange = (key: string) => {
    setActivePath(key)
    history.push(key)
  }

  const tabBarExtraContent = useCallback(() => {
    return {
      right: (
        <Space>
          <Select placeholder="请选择" style={{ width: 140 }} onSelect={setCloseType} value={closeType}>
            <Select.Option value="left">关闭左侧窗口</Select.Option>
            <Select.Option value="right">关闭右侧窗口</Select.Option>
            <Select.Option value="other">关闭其他窗口</Select.Option>
          </Select>
          <Button danger onClick={clonseWindowsHandler}>
            确定关闭
          </Button>
        </Space>
      ),
    }
  }, [closeType])

  return (
    <div className={styles.navs}>
      <PageTitle />
      <Header className={styles.admin_header}>
        <img className={styles.admin_logo} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" height={28} />
        用户中心
      </Header>
      <Layout className={styles.admin_layout_wrapper}>
        <SiderMenu openedTabs={openedTabs} setOpenedTabs={setOpenedTabs} activePath={activePath} setActivePath={setActivePath} componentMap={componentMap} />
        <Layout className={styles.site_layout}>
          <div className={styles.admin_content}>
            <Tabs
              className={styles.nav_tab_wrapper}
              activeKey={activePath}
              onChange={onTabChange}
              hideAdd
              onEdit={(e, action) => {
                if (typeof e === "string") {
                  onEditHandler(e, action)
                }
              }}
              type="editable-card"
              tabBarExtraContent={tabBarExtraContent()}
              items={openedTabs?.length > 1 ? openedTabs : [{ ...openedTabs[0], closable: false }]}
            />
          </div>
        </Layout>
      </Layout>
    </div>
  )
}
