<template>
  <div
    class="floating-ball"
    ref="ballRef"
    :style="{ left: position.x + 'px', top: position.y + 'px' }"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <div class="marquee-container">
      <div class="marquee-content">
        <span class="ball-text">bruce欢迎您</span>
        <span class="ball-text">bruce欢迎您</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const ballRef = ref<HTMLElement | null>(null)
const position = reactive({ x: 20, y: 300 })
const isDragging = ref(false)
const dragOffset = reactive({ x: 0, y: 0 })

const startDrag = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
  dragOffset.x = clientX - position.x
  dragOffset.y = clientY - position.y

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', onDrag, { passive: false })
  document.addEventListener('touchend', stopDrag)
}

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return

  e.preventDefault()
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

  let newX = clientX - dragOffset.x
  let newY = clientY - dragOffset.y

  // Boundary constraints
  const maxX = window.innerWidth - 80
  const maxY = window.innerHeight - 80

  newX = Math.max(0, Math.min(newX, maxX))
  newY = Math.max(0, Math.min(newY, maxY))

  position.x = newX
  position.y = newY
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
}

onMounted(() => {
  // Set initial position to right side of screen
  position.x = window.innerWidth - 100
  position.y = window.innerHeight / 2
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
})
</script>

<style scoped lang="scss">
.floating-ball {
  position: fixed;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
  z-index: 9999;
  user-select: none;
  transition: box-shadow 0.3s ease;
  animation: bounce 5s ease-in-out infinite;

  &:hover {
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }

  &:active {
    box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
  }

  .marquee-container {
    width: 100%;
    overflow: hidden;
    display: flex;
    
    .marquee-content {
      display: flex;
      animation: marquee 10s linear infinite;
      white-space: nowrap;
    }
    
    .ball-text {
      color: white;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
      padding: 0 10px;
    }
  }
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-30px);
  }
  50% {
    transform: translateY(10px);
  }
  75% {
    transform: translateY(-20px);
  }
}
</style>
