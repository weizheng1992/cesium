<script setup lang="ts">
import Write from './components/Write.vue'
import { ref, unref, watch } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter } from 'vue-router'
import { saveTableApi } from '@/api/table'
import { useEmitt } from '@/hooks/event/useEmitt'
import { Dialog } from '@/components/Dialog'

const { emitter } = useEmitt()

const { push, go } = useRouter()

const { t } = useI18n()

const writeRef = ref<ComponentRef<typeof Write>>()

const loading = ref(false)
const dialogVisible = ref(false)

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

watch(
  () => props.visible,
  (visible: boolean) => {
    dialogVisible.value = visible
  },
  {
    immediate: true
  }
)

const save = async () => {
  const write = unref(writeRef)
  const formData = await write?.submit()
  if (formData) {
    loading.value = true
    const res = await saveTableApi(formData)
      .catch(() => {})
      .finally(() => {
        loading.value = false
      })
    if (res) {
      emitter.emit('getList', 'add')
      push('/interference/index')
    }
  }
}
</script>

<template>
  <Dialog v-model="dialogVisible" :title="t('router.interferenceAdd')">
    <Write ref="writeRef" />

    <template #header>
      <ElButton @click="go(-1)">
        {{ t('common.back') }}
      </ElButton>
      <ElButton type="primary" :loading="loading" @click="save">
        {{ t('exampleDemo.save') }}
      </ElButton>
    </template>
  </Dialog>
</template>
