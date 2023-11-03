<script setup lang="ts">
import Detail from './components/Detail.vue'
import { ContentDetailWrap } from '@/components/ContentDetailWrap'
import { ref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter, useRoute } from 'vue-router'
import { getTableDetApi } from '@/api/table'
import { TableData } from '@/api/table/types'
import { ElButton, ElDivider } from 'element-plus'
import Process from './components/Process.vue'

const { push, go } = useRouter()

const { query } = useRoute()

const { t } = useI18n()

const currentRow = ref<Nullable<TableData>>(null)

const getTableDet = async () => {
  const res: any = await getTableDetApi(query.id as string)
  if (res) {
    currentRow.value = res
  }
}

getTableDet()
</script>

<template>
  <ContentDetailWrap :title="t('router.interferenceDetail')" @back="push('/interference/index')">
    <template #header>
      <ElButton @click="go(-1)">
        {{ t('common.back') }}
      </ElButton>
    </template>
    <ElButton class="mb-2" type="primary">
      {{ t('interference.addProcess') }}
    </ElButton>
    <ElDivider content-position="left">{{ t('router.interferenceDetail') }}</ElDivider>
    <Detail :current-row="currentRow" />
    <ElDivider content-position="left">{{ t('interference.process') }}</ElDivider>
    <Process />
  </ContentDetailWrap>
</template>
