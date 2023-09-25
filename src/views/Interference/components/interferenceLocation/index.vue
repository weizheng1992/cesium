<script setup lang="ts">
import { ref, defineEmits, reactive, watch } from 'vue'
import { ElButton, ElButtonGroup, ElInput } from 'element-plus'
// import PointDialog from '@/views/BasicData/Regional/components/PointDialog.vue'
import { useI18n } from '@/hooks/web/useI18n'
import MapPoint from './MapPoint.vue'

const { t } = useI18n()

const mapPointVisible = ref(false)
const location = reactive({
  lng: '',
  lat: ''
})

const emit = defineEmits(['update:modelValue', 'change'])
defineProps({
  modelValue: String
})

const handleLocation = (obj) => {
  location.lat = obj.lat
  location.lng = obj.lng
}

watch(
  () => location,
  (val) => {
    emit('update:modelValue', val)
    emit('change', val)
  }
)
</script>

<template>
  <div>
    <el-button-group>
      <!-- <el-button type="primary" @click="pointVisible = !pointVisible">{{
        t('interferenceLocation.enterCoordinates')
      }}</el-button> -->
      <el-button type="primary" @click="mapPointVisible = !mapPointVisible">
        {{ t('interferenceLocation.mapPointing') }}
      </el-button>
    </el-button-group>
    <ElInput class="w-20!" v-model="location.lat" :placeholder="t('common.lat')" />
    <ElInput class="w-20!" v-model="location.lng" :placeholder="t('common.lon')" />
    <!-- <PointDialog :visible="pointVisible" :location="modelValue" @on-location="handleLocation" /> -->
    <MapPoint :visible="mapPointVisible" @on-location="handleLocation" />
  </div>
</template>
