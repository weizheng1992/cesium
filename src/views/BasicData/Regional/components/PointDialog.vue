<script setup lang="ts">
import { Dialog } from '@/components/Dialog'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { ref, reactive, watch } from 'vue'
import { Form, FormSchema } from '@/components/Form'
import { useValidator } from '@/hooks/web/useValidator'
import { getDictOneApi } from '@/api/common'
import { useForm } from '@/hooks/web/useForm'

const { required } = useValidator()

const { t } = useI18n()

const dialogVisible2 = ref(false)

const { formRegister, formMethods } = useForm()
const { getElFormExpose } = formMethods

const props = defineProps({
  visible: { type: Boolean, default: false }
})

const schema = reactive<FormSchema[]>([
  {
    field: 'field1',
    label: t('common.lat'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'field2',
    label: t('common.lon'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  }
])

watch(
  () => props.visible,
  (visible) => {
    dialogVisible2.value = visible
  }
)

const formSubmit = async () => {
  const elFormExpose = await getElFormExpose()
  elFormExpose?.validate((valid) => {
    if (valid) {
      console.log('submit success')
    } else {
      console.log('submit fail')
    }
  })
}
</script>

<template>
  <Dialog v-model="dialogVisible2" :title="t('common.dialog')">
    <Form :schema="schema" @register="formRegister" />
    <template #footer>
      <ElButton type="primary" @click="formSubmit">{{ t('common.submit') }}</ElButton>
      <ElButton @click="dialogVisible2 = false">{{ t('common.close') }}</ElButton>
    </template>
  </Dialog>
</template>
