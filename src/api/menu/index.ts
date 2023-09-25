import { defHttp } from '@/config/axios'

export const getMenuListApi = () => {
  return defHttp.get({ url: '/menu/list' })
}
