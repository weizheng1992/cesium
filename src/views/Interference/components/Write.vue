<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'
import { TableData } from '@/api/table/types'
import { useI18n } from '@/hooks/web/useI18n'
import { useValidator } from '@/hooks/web/useValidator'
import Location from './interferenceLocation/index.vue'

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<TableData>>,
    default: () => null
  }
})

const { t } = useI18n()

const { formRegister, formMethods } = useForm()
const { setValues, getFormData, getElFormExpose, setSchema } = formMethods

const schema = reactive<FormSchema[]>([
  {
    field: 'title',
    label: t('interference.unit'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    },
    colProps: {
      span: 24
    }
  },
  {
    field: 'author',
    label: t('interference.region'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'author',
    label: t('interference.location'),
    formItemProps: {
      slots: {
        default: (formModel: any) => {
          return <Location v-model={formModel['author']} />
        }
      }
    }
  },
  {
    field: 'importance',
    label: t('interference.frequency'),
    component: 'Select',
    formItemProps: {
      rules: [required()]
    },
    componentProps: {
      options: [
        {
          label: '重要',
          value: 3
        },
        {
          label: '良好',
          value: 2
        },
        {
          label: '一般',
          value: 1
        }
      ]
    }
  },
  {
    field: 'display_time',
    label: t('interference.startTime'),
    component: 'DatePicker',
    componentProps: {
      type: 'datetime',
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
    formItemProps: {
      rules: [required()]
    }
  },

  {
    field: 'pageviews',
    label: t('interference.business'),
    component: 'InputNumber',
    value: 0,
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'author',
    label: t('interference.equipment'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'author',
    label: t('interference.scope'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'author',
    label: t('interference.type'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'author',
    label: t('interference.degree'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  }
])

const rules = reactive({
  title: [required()],
  author: [required()],
  importance: [required()],
  pageviews: [required()],
  display_time: [required()],
  content: [required()]
})

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
    setSchema([
      {
        field: 'content',
        path: 'componentProps.defaultHtml',
        value: currentRow.content
      }
    ])
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
  <Form :rules="rules" @register="formRegister" :schema="schema" />
</template>
