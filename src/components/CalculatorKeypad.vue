<template>
  <div class="calc__display">
    <div class="calc__history">
      <button class="history__button">
        <span class="history__button--icon" @click="historyModalOpen = !historyModalOpen"></span>
      </button>
    </div>
    <div class="calc__input_container">
      <p class="result--prev">{{ inputPrevValue }}</p>
      <p class="result" @keypress="onKeyPressEvent">{{ inputDisplayValue }}</p>
    </div>
    
    <teleport to="body">
      <div v-if="historyModalOpen" class="calc__history--modal">
        <div class="history--modal__contents">
          <p>아직 기록이 없음</p>
        </div>
      </div>
    </teleport>
  </div>
  
  <div class="calc__keypad" @click.left="onClickKeyPad">
    <div class="keypad__group">
      <button></button>
      <button>CE</button>
      <button>C</button>
      <button class="keypad__backspace">
        <span class="keypad__backspace--icon">backspace</span>
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
import { ref } from '@vue/reactivity'

export default {
  name: 'CalculatorKeypad',
  setup () {
    const inputDisplayValue = ref(0)
    const inputPrevValue = ref('')
    const historyModalOpen = ref(true)

    const onKeyPressEvent = ($event) => {
      console.log($event)
    }
    
    const onClickKeyPad = (event) => {
      const innerText = event.target.innerText
      
      if (innerText === undefined || innerText === null || innerText === '') return false
      
      console.log('event:::::', event, innerText)
      switch (true) {
        case /^[0-9]*$/.test(innerText):
          console.log('숫자');
          break;
        case /^[+\-×C]*$/.test(innerText):
          console.log('숫자');
          break;
        case /^[=]*$/.test(innerText):
          console.log('계산');
          break;
        default:
          console.error('알 수 없는 입력값 입니다.');
      }
    }

    return {
      inputDisplayValue,
      inputPrevValue,
      historyModalOpen,
      onKeyPressEvent,
      onClickKeyPad
    }
  }
}
</script>
