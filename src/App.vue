<template>
  <div class="calculator">
    <calculator-display />
    <calculator-keypad />
  </div>
</template>

<script>
import CalculatorDisplay from '@/components/CalculatorDisplay.vue'
import CalculatorKeypad from '@/components/CalculatorKeypad.vue'

export default {
  name: 'App',
  components: {
    CalculatorDisplay,
    CalculatorKeypad
  }
}
</script>

<style lang="scss">
  // @import "@/assets/style/main.scss";
</style>