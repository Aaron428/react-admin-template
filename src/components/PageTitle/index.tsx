import { Helmet, useLocation } from "umi"
import { getRouteNameByPath } from "@/utils"

const PageTitle = () => {
  const { pathname } = useLocation()
  const newPathname = pathname === "/" ? "/welcome" : pathname

  return (
    <Helmet>
      <title>{getRouteNameByPath(newPathname) || '404'}</title>
    </Helmet>
  )
}

export default PageTitle
