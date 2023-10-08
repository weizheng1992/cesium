<script setup lang="tsx">
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { getTableListApi } from '@/api/table'
import { TableData } from '@/api/table/types'
import { ref } from 'vue'
import { ElButton } from 'element-plus'

interface Params {
  pageIndex?: number
  pageSize?: number
}

const { t } = useI18n()

const columns: TableColumn[] = [
  {
    field: 'index',
    label: t('common.index'),
    type: 'index'
  },
  {
    field: 'author',
    label: t('common.oldIndex')
  },
  {
    field: 'display_time',
    label: t('common.lat'),
    sortable: true
  },
  {
    field: 'importance',
    label: t('common.lon')
  },
  {
    field: 'pageviews',
    label: t('regional.borderPoints')
  },
  {
    field: 'action',
    label: t('common.action'),
    width: 160,
    slots: {
      default: (data) => {
        return (
          <>
            <ElButton type="primary" onClick={() => actionFn(data.row, 'edit')}>
              {t('common.edit')}
            </ElButton>
            <ElButton type="danger" onClick={() => delData(data.row)}>
              {t('common.del')}
            </ElButton>
          </>
        )
      }
    }
  }
]

const loading = ref(true)

let tableDataList = ref<TableData[]>([])

const getTableList = async (params?: Params) => {
  const res = await getTableListApi(
    params || {
      pageIndex: 1,
      pageSize: 10
    }
  )
    .catch(() => {})
    .finally(() => {
      loading.value = false
    })
  if (res) {
    tableDataList.value = res.records
  }
}

getTableList()

const actionFn = (data: any) => {
  console.log(data)
}

const delData = () => {}
</script>

<template>
  <Table
    :columns="columns"
    :data="tableDataList"
    :loading="loading"
    :defaultSort="{ prop: 'display_time', order: 'descending' }"
  />
</template>
