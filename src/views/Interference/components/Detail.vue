<script setup lang="tsx">
import { PropType, reactive } from 'vue'
import type { TableData } from '@/api/table/types'
import { Descriptions, DescriptionsSchema } from '@/components/Descriptions'
import { useI18n } from '@/hooks/web/useI18n'
import { ElTag } from 'element-plus'

const { t } = useI18n()

defineProps({
  currentRow: {
    type: Object as PropType<Nullable<TableData>>,
    default: () => null
  }
})

const schema = reactive<DescriptionsSchema[]>([
  {
    field: 'title',
    label: t('interference.unit')
  },
  {
    field: 'author',
    label: t('interference.region')
  },
  {
    field: 'author',
    label: t('interference.location')
  },
  {
    field: 'importance',
    label: t('interference.frequency'),
    slots: {
      default: (data: any) => {
        return (
          <ElTag
            type={data.importance === 1 ? 'success' : data.importance === 2 ? 'warning' : 'danger'}
          >
            {data.importance === 1
              ? t('common.important')
              : data.importance === 2
              ? t('common.good')
              : t('common.commonly')}
          </ElTag>
        )
      }
    }
  },
  {
    field: 'display_time',
    label: t('interference.startTime')
  },

  {
    field: 'pageviews',
    label: t('interference.business')
  },
  {
    field: 'author',
    label: t('interference.equipment')
  },
  {
    field: 'author',
    label: t('interference.scope')
  },
  {
    field: 'author',
    label: t('interference.type')
  },
  {
    field: 'author',
    label: t('interference.degree')
  }
])
</script>

<template>
  <Descriptions :schema="schema" :data="currentRow || {}" />
</template>
