<template>
  <div class="calc__history--modal" @click="closeHistoryModal">
    <div class="history__container">
      <p v-if="calcHistoryArray.length === 0">아직 기록이 없음</p>
      <template v-else>
        <div
          class="history__contents"
          v-for="(history, index) in calcHistoryArray"
          :key="index"
          @click.stop="clickHistory(history)"
        >
          <p>{{ history.statement }}</p>
          <p class="result">{{ history.result }}</p>
        </div>
      </template>
    </div>
    <div class="history__footer">
      <button class="clear__button" @click.stop="clearHistory">
        <span class="clear__button--icon"></span>
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'CalculatorHistory',
  setup (props, context) {
    const store = useStore()
    const calcHistoryArray = computed(() => store.getters.calcHistoryArray)

    const closeHistoryModal = () => context.emit('closeHistoryModal')

    const clickHistory = (item) => store.commit('changeDisplay', item)
    
    const clearHistory = () => store.commit('clearHistory')
    
    return {
      calcHistoryArray,
      closeHistoryModal,
      clickHistory,
      clearHistory
    }
  }
}
</script>
