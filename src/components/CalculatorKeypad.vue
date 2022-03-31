<template>
  <div class="calc__display">
    <div class="calc__history">
      <button class="history__button">
        <span class="history__button--icon" @click="historyModalOpen = !historyModalOpen"></span>
      </button>
    </div>
    <div class="calc__input_container">
      <p class="result--prev">{{ displayValue.prev }}</p>
      <p class="result" @keypress="onKeyPressEvent">{{ displayValue.next }}</p>
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
import { reactive, ref } from '@vue/reactivity'

export default {
  name: 'CalculatorKeypad',
  setup () {
    let displayValue = reactive({
      prev: '',
      next: '0',
      arithmetic: false
    })
    const displayPrevValue = ref('')
    const inputPrevValue = ref('0')
    const historyModalOpen = ref(true)

    const onKeyPressEvent = ($event) => {
      console.log($event)
    }
    
    const onClickKeyPad = (event) => {
      const innerText = event.target.innerText
      
      if (innerText === undefined || innerText === null || innerText === '') return false
      
      const numberReg = /^[0-9]$/
      const operatorReg = /^([+\-.×÷])|(C|\bCE\b|\bbackspace\b|\b\+\/-\b)$/
      
      switch (true) {
        case numberReg.test(innerText):
        case operatorReg.test(innerText):
          displayInputValue(innerText)
          break;
        case /^[=]$/.test(innerText):
          displayResult()
          break;
        default:
          console.error('알 수 없는 입력값 입니다.');
      }
    }

    const displayInputValue = (value) => {
      const isZeroDisplayValue = displayValue.next === '0'
      const isArithmetic = /^([+\-×÷])$/.test(value)
      
      console.log(value)
      
      if (isNaN(value)) {
        if (value === 'backspace') displayValue.next.length === 1 ? displayValue.next = '0' : displayValue.next = displayValue.next.slice(0, -1)
        
        if (value === 'C' || value === 'CE') {
          displayValue.next = '0'
          displayValue.prev = ''
        }
        
        if (value === '.' && !displayValue.next.includes(value)) {
          displayValue.next = `${displayValue.next}${value}`
        }
        
        if (isArithmetic) {
          displayValue.prev = `${displayValue.next} ${value}`
          
          if (displayValue.arithmetic) {
            displayResult()
            displayValue.arithmetic = false
          } else displayValue.arithmetic = true 
        }
      } else {
        isZeroDisplayValue ? displayValue.next = value : displayValue.next += value
      }
    }

    const displayResult = () => {
      console.log('계산!!!')
    }

    return {
      displayValue,
      displayPrevValue,
      inputPrevValue,
      historyModalOpen,
      onKeyPressEvent,
      onClickKeyPad,
      displayInputValue,
      displayResult
    }
  }
}
</script>
