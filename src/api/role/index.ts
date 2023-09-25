import { defHttp } from '@/config/axios'

export const getRoleListApi = () => {
  return defHttp.get({ url: '/role/table' })
}
