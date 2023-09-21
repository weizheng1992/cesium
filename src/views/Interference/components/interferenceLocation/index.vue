<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { ElButton, ElButtonGroup } from 'element-plus'
import PointDialog from '@/views/BasicData/Regional/components/PointDialog.vue'
import { useI18n } from '@/hooks/web/useI18n'
import MapPoint from './MapPoint.vue'

const { t } = useI18n()

const pointVisible = ref(false)
const mapPointVisible = ref(false)

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: String
})
</script>

<template>
  <div>
    <el-button-group>
      <el-button type="primary" @click="pointVisible = !pointVisible">{{
        t('interferenceLocation.enterCoordinates')
      }}</el-button>
      <el-button type="primary" @click="mapPointVisible = !mapPointVisible">
        {{ t('interferenceLocation.mapPointing') }}
      </el-button>
    </el-button-group>
    <PointDialog :visible="pointVisible" />
    <MapPoint :visible="mapPointVisible" />
  </div>
</template>
