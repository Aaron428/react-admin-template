import { routes } from "@/config/routes"

export const getRouteNameByPath = (path: string): string => {
  for (let i = 0; i < routes.length; i++) {
    const item = routes[i]
    if (item.key === path) return item.label
    if (Array.isArray(item.children)) {
      const target = item.children.find(r => r.key === path)
      if (target) {
        return target.label
      }
    }
  }
  return ""
}
