import { defHttp } from '@/config/axios'
import { DepartmentListResponse, DepartmentUserParams, DepartmentUserResponse } from './types'

export const getDepartmentApi = () => {
  return defHttp.get<DepartmentListResponse>({ url: '/department/list' })
}

export const getUserByIdApi = (params: DepartmentUserParams) => {
  return defHttp.get<DepartmentUserResponse>({ url: '/department/users', params })
}

export const deleteUserByIdApi = (ids: string[] | number[]) => {
  return defHttp.post({ url: '/department/user/delete', data: { ids } })
}

export const saveUserApi = (data: any) => {
  return defHttp.post({ url: '/department/user/save', data })
}

export const saveDepartmentApi = (data: any) => {
  return defHttp.post({ url: '/department/save', data })
}

export const deleteDepartmentApi = (ids: string[] | number[]) => {
  return defHttp.post({ url: '/department/delete', data: { ids } })
}

export const getDepartmentTableApi = (params: any) => {
  return defHttp.get({ url: '/department/table/list', params })
}
