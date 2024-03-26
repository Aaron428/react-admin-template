import { ReactElement } from "react"

export interface TabType {
  path: string
  key: string
  children: ReactElement
  label: string
}

export type CloseType = "right" | "left" | "other"