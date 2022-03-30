<template>
  <div class="calc__display">
    <div class="calc__history">
      <button class="history__button">
        <span class="history__button--icon" @click="historyModalOpen = !historyModalOpen"></span>
      </button>
    </div>
    <div class="calc__input_container">
      <p class="input--prev">300 + 3000</p>
      <p class="input">0</p>
    </div>
    
    <teleport to="body">
      <div v-if="historyModalOpen" class="calc__history--modal">
        <div class="history--modal__contents">
          <p>아직 기록이 없음</p>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  name: 'CalculatorDisplay',
  setup () {
    const historyModalOpen = ref(true)

    return {
      historyModalOpen
    }
  }
}
</script>