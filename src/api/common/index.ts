import { defHttp } from '@/config/axios'

// 获取所有字典
export const getDictApi = () => {
  return defHttp.get({ url: '/dict/list' })
}

// 模拟获取某个字典
export const getDictOneApi = async () => {
  return defHttp.get({ url: '/dict/one' })
}
