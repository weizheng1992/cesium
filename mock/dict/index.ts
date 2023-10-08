import { MockMethod } from 'vite-plugin-mock'

const code = 0

const timeout = 1000

const dictObj: Recordable = {
  importance: [
    {
      value: 0,
      label: 'common.commonly'
    },
    {
      value: 1,
      label: 'common.good'
    },
    {
      value: 2,
      label: 'common.important'
    }
  ]
}

export default [
  // 字典接口
  {
    url: '/dict/list',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: code,
        data: dictObj
      }
    }
  },
  // 获取某个字典
  {
    url: '/dict/one',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: code,
        data: [
          {
            label: 'test1',
            value: 0
          },
          {
            label: 'test2',
            value: 1
          },
          {
            label: 'test3',
            value: 2
          }
        ]
      }
    }
  }
] as MockMethod[]
