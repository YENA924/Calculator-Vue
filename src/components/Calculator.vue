<template>
  <div class="calculator">
    <div class="calc__header">
      <div class="calc__history">
        <button class="history__button"></button>
      </div>
      <div class="calc__input_container">
        <p class="input--prev">300 + 3000</p>
        <p class="input">0</p>
      </div>
    </div>
    <div class="calc__keypad_container">
      <div class="keypad__group">
        <button></button>
        <button>CE</button>
        <button>C</button>
        <button class="keypad--backspace"></button>
      </div>
      <div class="keypad__group">
        <button></button>
        <button></button>
        <button></button>
        <button>÷</button>
      </div>
      <div class="keypad__group">
        <button class="keypad--white">7</button>
        <button class="keypad--white">8</button>
        <button class="keypad--white">9</button>
        <button>×</button>
      </div>
      <div class="keypad__group">
        <button class="keypad--white">4</button>
        <button class="keypad--white">5</button>
        <button class="keypad--white">6</button>
        <button>-</button>
      </div>
      <div class="keypad__group">
        <button class="keypad--white">1</button>
        <button class="keypad--white">2</button>
        <button class="keypad--white">3</button>
        <button>+</button>
      </div>
      <div class="keypad__group">
        <button class="keypad--white">더하기/빼기</button>
        <button class="keypad--white">0</button>
        <button class="keypad--white">.</button>
        <button class="keypad--blue">=</button>
      </div>
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
<style lang="scss">
  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    width: 100%;
    height: 100%;
    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: #F5F5F5;
  }

  button {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    font-size: 100%;
    vertical-align: baseline;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    -webkit-appearance: none;
    appearance: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.05);
  }
  
  p {
    padding: 0;
    margin: 0;
  }

  button:hover {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1);
  }
  
  .calculator {
    padding: 15px;
  }
  
  .calculator div {
    display: flex;
    flex-direction: column;
  }

  .calc__header .calc__history {
    height: 24px;
    align-items: flex-end;
  }

  .calc__header .calc__history .history__button {
    width: 24px;
    height: 24px;
    background: url('@/assets/icon/history.svg') 0 0 repeat;
  }

  .calc__header .calc__input_container {
    margin-top: 15px;
    flex-direction: column;
    align-items: flex-end;
    flex-wrap: wrap;
  }

  .calc__header .calc__input_container .input {
    font-size: 48px;
    margin: 0;
  }

  .calc__keypad_container {
    margin: 15px 0;
    flex-direction: column;
    align-items: flex-start;
  }

  .calculator .keypad__group {
    width: 100%;
    flex-direction: row;
  }

  .calculator .keypad__group button {
    height: 45px;
    margin: 2px;
    background-color: #FAFAFA;
    border-radius: 3px;
    flex: 1 1;
  }
  
  .keypad--white {
    background-color: #ffffff !important ;
  }

  .keypad--blue {
    background-color: #0D47A1 !important ;
    color: #ffffff;
  }
</style>
