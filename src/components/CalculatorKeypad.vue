<template>
  <div class="calc__keypad">
    <div class="keypad__group">
      <button></button>
      <button>CE</button>
      <button>C</button>
      <button class="keypad__backspace">
        <span class="keypad__backspace--icon"></span>
      </button>
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
      <button class="keypad--white">+/-</button>
      <button class="keypad--white">0</button>
      <button class="keypad--white">.</button>
      <button class="keypad--blue">=</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalculatorKeypad'
}
</script>
