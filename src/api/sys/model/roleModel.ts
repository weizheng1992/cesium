import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel'

export type RoleParams = BasicPageParams & {
  roleName: string
}

export interface RoleListItem {
  roleCode: string
  roleDesc: string
  roleId: number
  roleName: string
  createBy: string
  createTime: string
}

export interface MenuListItem {
  name: string
}
export interface MenuParams {
  roleId: number
}

export type RoleGetResultModel = BasicFetchResult<RoleListItem>
export type MenuGetResultModel = BasicFetchResult<MenuListItem>
