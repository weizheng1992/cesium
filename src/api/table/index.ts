import { defHttp } from '@/config/axios'
import type { TableData } from './types'

export const getTableListApi = (params: any) => {
  return defHttp.get({ url: '/example/list', params })
}

export const getTreeTableListApi = (params: any) => {
  return defHttp.get({ url: '/example/treeList', params })
}

export const saveTableApi = (data: Partial<TableData>): Promise<IResponse> => {
  return defHttp.post({ url: '/example/save', data })
}

export const getTableDetApi = (id: string): Promise<IResponse<TableData>> => {
  return defHttp.get({ url: '/example/detail', params: { id } })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  return defHttp.post({ url: '/example/delete', data: { ids } })
}
