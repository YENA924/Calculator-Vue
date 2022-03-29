<template>
  <div class="calculator">
    <div class="calc__header">
      <div class="calc__history"></div>
      <div class="calc__input_container"></div>
    </div>
    <div class="calc__contents">
      <div class="calc__keypad"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
