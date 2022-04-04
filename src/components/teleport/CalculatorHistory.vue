<template>
  <div class="calc__history--modal">
    <div class="history__container">
      <p v-if="calcHistoryArray.length === 0">아직 기록이 없음</p>
      <template v-else>
        <div v-for="(history, index) in calcHistoryArray" :key="index" class="history__contents">
          <p>{{ history.statement }}</p>
          <p class="result">{{ history.result }}</p>
        </div>
      </template>
    </div>
    <div class="history__footer">
      <button class="remove__button">
        <span class="remove__button--icon"></span>
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'CalculatorHistory',
  setup () {
    const store = useStore()
    const calcHistoryArray = computed(() => store.getters.calcHistoryArray)
    
    return {
      calcHistoryArray
    }
  }
}
</script>
