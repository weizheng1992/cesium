import { RoleParams, RoleGetResultModel, MenuGetResultModel, MenuParams } from './model/roleModel'
import { defHttp } from '@/config/axios'

enum Api {
  RoleList = '/sysrole/page',
  menuList = '/sysrole/menu'
}

export const getRoleList = (params?: RoleParams) =>
  defHttp.get<RoleGetResultModel>({ url: Api.RoleList, params })

export const getMenuList = (params: MenuParams) =>
  defHttp.get<MenuGetResultModel>({ url: `${Api.menuList}/${params.roleId}` })
