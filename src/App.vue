<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
  <FloatingBall />
</template>

<script setup lang="ts">
import { initializeAudio } from './utils/common'
import { IMSDK } from '@/utils/imCommon'
import { getIMToken } from '@/utils/storage'
import FloatingBall from '@/components/FloatingBall.vue'

initializeAudio()

document.addEventListener('contextmenu', function (event) {
  event.preventDefault()
})

document.addEventListener('visibilitychange', function () {
  // Only call setAppBackgroundStatus if SDK is initialized (user is logged in)
  const isSDKInitialized = !!getIMToken()
  if (!isSDKInitialized) {
    return
  }

  if (document.visibilityState === 'visible') {
    IMSDK.setAppBackgroundStatus(false)
  }
  if (document.visibilityState === 'hidden') {
    IMSDK.setAppBackgroundStatus(true)
  }
})
</script>

<style lang="scss"></style>
