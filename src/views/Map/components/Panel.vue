<template>
  <div class="panel-wrap" :class="{ hide: !dialogVisible }">
    <slot v-if="$slots.default"></slot>
    <div class="panel" v-else>
      <el-tree
        :height="400"
        show-checkbox
        :load="loadNode"
        lazy
        :props="treeProps"
        style="
          --el-fill-color-blank: transparent;
          --el-tree-text-color: #fff;
          --el-tree-node-hover-bg-color: rgba(203, 225, 229, 0.3);
          --el-tree-expand-icon-color: #fff;
        "
      />
    </div>
    <aside class="bar" @click="toggle">
      <span :class="{ 'slide-in': dialogVisible }">＜</span>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, reactive } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { ElTree } from 'element-plus'

const emits = defineEmits(['update:visible', 'btnClick'])

const props = defineProps({
  width: {
    type: String,
    default: '30%'
  },
  visible: {
    type: Boolean,
    default: false
  }
})
const dialogVisible = ref(false)

interface Tree {
  name: string
  leaf?: boolean
}

const treeProps = {
  label: 'name',
  children: 'zones',
  isLeaf: 'leaf'
}
const data = reactive<any>([
  { id: 0, label: '机场', children: [], isLeaf: false },
  { id: 11, label: '航线', children: [], isLeaf: false }
])
let count = 1

watchEffect(() => {
  dialogVisible.value = props.visible
})

const toggle = () => {
  dialogVisible.value = !dialogVisible.value
  emits('update:visible', dialogVisible.value)
}

// const handleNodeExpand = (_, node) => {
//   nodeClose.value = node.key
//   defaultExpandedKeys.value.push(node.key)
// }
// const handleNodeCollapse = () => {
//   nodeClose.value = null
// }

// const handleTreeIcon = (node) => {
//   const index = data.findIndex((item) => item.id === node.key)
//   if (index > -1) {
//     data[index]?.children.push([{ id: 1, label: 'name', isLeaf: true }])
//     console.log(data)
//   }
// }

const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
  if (node.level === 0) {
    return resolve([{ name: '北京机场' }, { name: '航线' }])
  }
  if (node.level > 1) return resolve([])

  setTimeout(() => {
    const data: Tree[] = [
      {
        name: '北京机场',
        leaf: true
      },
      {
        name: '大兴航线',
        leaf: true
      }
    ]

    resolve(data)
  }, 500)
}
</script>
<style scoped lang="less">
.panel-wrap {
  font-size: 14px;
  position: fixed;
  right: 20px;
  top: 70%;
  transform: translateY(-50%);
  width: 300px;
  height: auto;
  background: rgba(0, 68, 82, 0.28);
  transition: right 0.24s ease-in-out;
  border-radius: 5px;
  border: 1px solid rgba(0, 68, 82, 0.6);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  &.hide {
    right: -300px;
  }

  .panel {
    height: 400px;
    overflow: hidden;
  }

  .panel-header {
    padding: 0 0 0 10px;
    line-height: 30px;
    color: #fff;
    display: flex;
    justify-content: space-between;

    .close-btn {
      display: inline-block;
      cursor: pointer;
      width: 30px;
      height: 30px;
      font-size: 18px;
    }
  }

  .item-header {
    font-size: 12px;
    color: steelblue;
    text-align: start;
    line-height: 30px;
    border-top: 1px solid rgba(70, 131, 180, 0.596);
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    overflow: auto;

    .content-wrap {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      button {
        margin: 0 0 10px;
      }
    }
  }

  .bar {
    width: 20px;
    height: 30px;
    font-size: 18px;
    text-align: center;
    line-height: 30px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    position: absolute;
    left: -21px;
    top: calc(50% - 15px);
    color: #fff;
    background: rgb(70, 131, 180);
    cursor: pointer;
    opacity: 0.6;
    transition: all 0.25s ease-in-out;

    span {
      transition: all 0.25s ease-in-out;

      &.slide-in {
        display: inline-block;
        transform: rotate(0.5turn);
      }
    }

    &:hover {
      opacity: 1;
    }
  }

  button {
    background: transparent;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    padding: 6px 12px;
    color: #fff;
    margin-bottom: 10px;
    border: 1px solid steelblue;
    transition: all 0.1s ease-in-out;

    & + button {
      margin-left: 10px;
    }

    &:hover,
    &.active {
      background: steelblue;
    }
  }
}

:deep(.el-tree-virtual-list) {
  margin: 20px;
}

// :deep(.el-tree-node__content > .el-tree-node__expand-icon) {
//   display: none;
// }
</style>
