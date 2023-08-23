import { v4 as uuidv4 } from 'uuid'
export default [
  {
    id: uuidv4(),
    name: '一区',
    icon: '',
    checked: false,
    expanded: false,
    children: []
  },
  {
    id: uuidv4(),
    name: '二区',
    icon: '',
    checked: false,
    expanded: false,
    children: [
      //   {
      //     type: 'Feature',
      //     geometry: {
      //       type: 'MultiPoint',
      //       coordinates: [[108.253394, 29.730675]]
      //     },
      //     properties: {
      //       name: '摄像头点位1',
      //       pyname: 'hstxgjjc',
      //       kind: '8100',
      //       id: uuidv4(),
      //       checked: true
      //     }
      //   }
    ]
  }
]
