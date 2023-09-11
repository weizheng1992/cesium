<template>
  <div class="panel-wrap" :class="{ hide: !dialogVisible }">
    <slot v-if="$slots.default"></slot>
    <div class="panel" v-else>
      <el-tree-v2
        :data="data"
        :height="400"
        :props="treeProps"
        show-checkbox
        :default-checked-keys="defaultCheckedKeys"
        :default-expanded-keys="defaultExpandedKeys"
        style="
          --el-fill-color-blank: transparent;
          --el-tree-text-color: #fff;
          --el-tree-node-hover-bg-color: rgba(203, 225, 229, 0.3);
        "
        @node-expand="handleNodeExpand"
        @node-collapse="handleNodeCollapse"
      >
        <template #default="{ node }">
          <div class="flex justify-between flex-1">
            <span>{{ node.label }}</span>
            <span class="prefix" v-if="!node.isLeaf">
              <Icon
                :icon="
                  nodeClose === node.key ? 'ic:sharp-arrow-circle-up' : 'ic:sharp-arrow-circle-down'
                "
            /></span>
          </div>
        </template>
      </el-tree-v2>
    </div>
    <aside class="bar" @click="toggle">
      <span :class="{ 'slide-in': dialogVisible }">＜</span>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { ElTreeV2 } from 'element-plus'
import { $t } from '@/utils/cesiumUtils/i18n'

const emits = defineEmits(['update:visible', 'btnClick'])

const props = defineProps({
  title: {
    type: String,
    default: $t('menus')
  },
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

const nodeClose = ref()

interface Tree {
  id: string
  label: string
  children?: Tree[]
}

const getKey = (prefix: string, id: number) => {
  return `${prefix}-${id}`
}

const createData = (
  maxDeep: number,
  maxChildren: number,
  minNodesNumber: number,
  deep = 1,
  key = 'node'
): Tree[] => {
  let id = 0
  return Array.from({ length: minNodesNumber })
    .fill(deep)
    .map(() => {
      const childrenNumber = deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
      const nodeKey = getKey(key, ++id)
      return {
        id: nodeKey,
        label: nodeKey,
        children: childrenNumber
          ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
          : undefined
      }
    })
}

const treeProps = {
  value: 'id',
  label: 'label',
  children: 'children'
}
const data = ref(createData(4, 30, 40))
const checkedKeys: string[] = []
const expanedKeys: string[] = []
for (const datum of data.value) {
  const children = datum.children
  if (children) {
    expanedKeys.push(datum.id)
    checkedKeys.push(children[0].id)
    break
  }
}

const defaultCheckedKeys = ref(checkedKeys)
const defaultExpandedKeys = ref(expanedKeys)

console.log(defaultExpandedKeys, defaultCheckedKeys)

watchEffect(() => {
  dialogVisible.value = props.visible
})

const toggle = () => {
  dialogVisible.value = !dialogVisible.value
  emits('update:visible', dialogVisible.value)
}

const handleNodeExpand = (_, node) => {
  nodeClose.value = node.key
}
const handleNodeCollapse = () => {
  nodeClose.value = null
}
</script>
<style scoped lang="less">
.panel-wrap {
  font-size: 14px;
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  height: auto;
  background: rgba(255, 255, 255, 0.28);
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
:deep(.el-tree-node__content > .el-tree-node__expand-icon) {
  display: none;
}
</style>
