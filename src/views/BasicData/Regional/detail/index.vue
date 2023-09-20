<script setup lang="ts">
import Detail from '../components/Detail.vue'
import { ContentDetailWrap } from '@/components/ContentDetailWrap'
import { ref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter, useRoute } from 'vue-router'
import { getTableDetApi } from '@/api/table'
import { TableData } from '@/api/table/types'
import { ElButton } from 'element-plus'
import PointList from '../components/PointList.vue'
import PointDialog from '../components/PointDialog.vue'

const { push, go } = useRouter()

const { query } = useRoute()

const { t } = useI18n()

const currentRow = ref<Nullable<TableData>>(null)
const visible = ref(false)

const getTableDet = async () => {
  const res = await getTableDetApi(query.id as string)
  if (res) {
    currentRow.value = res.data
  }
}

getTableDet()
</script>

<template>
  <ContentDetailWrap :title="t('router.regionalDetail')" @back="push('/basicData/regional')">
    <template #header>
      <ElButton @click="go(-1)">
        {{ t('common.back') }}
      </ElButton>
    </template>
    <ElButton type="primary" @click="visible = !visible">{{ t('regional.addPoint') }}</ElButton>
    <Detail :current-row="currentRow" />
    <PointList />
    <PointDialog :visible="visible" />
  </ContentDetailWrap>
</template>
