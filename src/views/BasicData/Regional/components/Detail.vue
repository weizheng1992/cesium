<script setup lang="tsx">
import { PropType, reactive } from 'vue'
import type { TableData } from '@/api/table/types'
import { Descriptions, DescriptionsSchema } from '@/components/Descriptions'
import { useI18n } from '@/hooks/web/useI18n'

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
    label: t('regional.name'),
    span: 24
  },
  {
    field: 'author',
    label: t('regional.code')
  },
  {
    field: 'display_time',
    label: t('regional.ucl')
  },
  {
    field: 'author',
    label: t('regional.ucl')
  },
  {
    field: 'author',
    label: t('common.lat')
  },
  {
    field: 'author',
    label: t('common.lon')
  }
])
</script>

<template>
  <Descriptions class="-mx-20px" :schema="schema" :data="currentRow || {}" />
</template>
