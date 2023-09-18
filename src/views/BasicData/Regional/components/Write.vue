<script setup lang="ts">
import { Form, FormSchema } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch, ref } from 'vue'
import { TableData } from '@/api/table/types'
import { useValidator } from '@/hooks/web/useValidator'
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import PointDialog from './PointDialog.vue'
import { ElButton } from 'element-plus'
import PointList from './PointList.vue'

const { required } = useValidator()
const { t } = useI18n()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<TableData>>,
    default: () => null
  },
  formSchema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  }
})

const rules = reactive({
  title: [required()],
  author: [required()],
  importance: [required()],
  pageviews: [required()],
  display_time: [required()],
  content: [required()]
})

const pointVisible = ref(false)

const { formRegister, formMethods } = useForm()
const { setValues, getFormData, getElFormExpose } = formMethods

const submit = async () => {
  const elForm = await getElFormExpose()
  const valid = await elForm?.validate().catch((err) => {
    console.log(err)
  })
  if (valid) {
    const formData = await getFormData()
    return formData
  }
}

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    setValues(currentRow)
  },
  {
    deep: true,
    immediate: true
  }
)

defineExpose({
  submit
})
</script>

<template>
  <ContentWrap :title="t('router.basicData')">
    <Form :rules="rules" @register="formRegister" :schema="formSchema" />
  </ContentWrap>
  <ContentWrap :title="t('regional.pointData')">
    <ElButton class="mb-10" type="primary" @click="pointVisible = true">{{
      t('regional.addPoint')
    }}</ElButton>
    <PointList />
  </ContentWrap>
  <PointDialog :visible="pointVisible" />
</template>
