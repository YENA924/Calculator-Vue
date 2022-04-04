<template>
  <div class="calc__display">
    <div class="calc__history">
      <button class="history__button" @click="historyModalOpen = true">
        <span class="history__button--icon"></span>
      </button>
    </div>
    <div class="calc__input_container">
      <p class="result--statement">{{ calcState.statement }}</p>
      <p class="result">{{ calcResult }}</p>
    </div>
    
    <teleport to="body" v-if="historyModalOpen">
      <calculator-history @closeHistoryModal="historyModalOpen = false"/>
    </teleport>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import CalculatorHistory from '@/components/teleport/CalculatorHistory'

export default {
  name: 'CalculatorDisplay',
  components: {
    CalculatorHistory
  },
  setup () {
    const store = useStore()
    const historyModalOpen = ref(false)
    const calcState = store.state.calculator
    const calcResult = computed(() => store.getters.calcResult)
    
    return {
      historyModalOpen,
      calcState,
      calcResult
    }
  }
}
</script>