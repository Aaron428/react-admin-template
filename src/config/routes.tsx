import { Spin } from "antd"
import { Suspense, lazy, type ReactElement } from "react"

const Welcome = lazy(() => import("@/pages/welcome"))
const Docs = lazy(() => import("@/pages/docs"))
const Unauthorized = lazy(() => import("@/pages/unauthorized"))

export const routes = [
  {
    path: "/welcome",
    component: (
      <Suspense fallback={<Spin spinning></Spin>}>
        <Welcome />
      </Suspense>
    ),
    label: "欢迎",
    key: "/welcome",
  },
  {
    path: "/docs",
    component: (
      <Suspense fallback={<Spin spinning></Spin>}>
        <Docs />
      </Suspense>
    ),
    label: "文档页",
    key: "/docs",
  },
  {
    path: "/unauthorized",
    component: (
      <Suspense fallback={<Spin spinning></Spin>}>
        <Unauthorized />
      </Suspense>
    ),
    label: "401",
    key: "/unauthorized",
  },
]

export const getComponentMap = () => {
  const componentMap: Record<string, ReactElement> = {}
  routes.forEach(r => {
    // if (r.children) {
    //   r.children.forEach(c => {
    //     componentMap[c.key] = c.component
    //   })
    // } else {
    // }
    componentMap[r.key] = r.component
  })
  return componentMap
}
