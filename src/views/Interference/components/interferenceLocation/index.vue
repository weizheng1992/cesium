<script setup lang="ts">
import { ref, defineEmits, PropType, watch, reactive } from 'vue'
import { ElButton, ElButtonGroup, ElInput } from 'element-plus'
// import PointDialog from '@/views/BasicData/Regional/components/PointDialog.vue'
import { useI18n } from '@/hooks/web/useI18n'
import MapPoint from './MapPoint.vue'
import { isArray } from '@/utils/is'

const { t } = useI18n()

type Location = string | number

const mapPointVisible = ref(false)
const location = reactive<Location[]>([])

const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  modelValue: {
    type: Object as PropType<Location[]>,
    default: () => undefined
  }
})

const handleLocation = (val: Location[]) => {
  location[0] = val[0]
  location[1] = val[1]
}
watch(
  () => props.modelValue,
  (val: Location[]) => {
    if (location && val && isArray(val)) {
      if (val.join('') === location.join('')) return
      location[0] = val[0]
      location[1] = val[1]
    }
  },
  {
    immediate: true
  }
)

watch(
  () => location,
  (val: Location[]) => {
    emit('update:modelValue', val)
    emit('change', val)
  },
  {
    immediate: true
  }
)
</script>

<template>
  <ElInput class="w-20!" v-model="location[0]" :placeholder="t('common.lat')" />
  <ElInput class="w-20!" v-model="location[1]" :placeholder="t('common.lon')" />
  <el-button-group>
    <!-- <el-button type="primary" @click="pointVisible = !pointVisible">{{
        t('interferenceLocation.enterCoordinates')
      }}</el-button> -->
    <el-button type="primary" @click="mapPointVisible = !mapPointVisible">
      {{ t('interferenceLocation.mapPointing') }}
    </el-button>
  </el-button-group>

  <!-- <PointDialog :visible="pointVisible" :location="modelValue" @on-location="handleLocation" /> -->
  <MapPoint :visible="mapPointVisible" @on-location="handleLocation" />
</template>
