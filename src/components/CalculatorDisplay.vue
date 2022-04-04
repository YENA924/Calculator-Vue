<template>
  <div class="calc__display">
    <div class="calc__history">
      <button class="history__button">
        <span class="history__button--icon" @click="historyModalOpen = !historyModalOpen"></span>
      </button>
    </div>
    <div class="calc__input_container">
      <p class="result--prev">{{ calcState.statement }}</p>
      <p class="result" @keypress="onKeyPressEvent">{{ calcResult }}</p>
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
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'CalculatorDisplay',
  setup () {
    const store = useStore()
    const historyModalOpen = ref(true)
    const calcState = store.state.calculator
    const calcResult = computed(() => store.getters.calcResult)
    
    const onKeyPressEvent = ($event) => {
      console.log($event)
    }
    
    return {
      historyModalOpen,
      calcState,
      calcResult,
      onKeyPressEvent
    }
  }
}
</script>