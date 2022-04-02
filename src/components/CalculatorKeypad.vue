<template>
  <div class="calc__display">
    <div class="calc__history">
      <button class="history__button">
        <span class="history__button--icon" @click="historyModalOpen = !historyModalOpen"></span>
      </button>
    </div>
    <div class="calc__input_container">
      <p class="result--prev">{{ displayValue.statement }}</p>
      <p class="result" @keypress="onKeyPressEvent">{{ displayValue.result }}</p>
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
import { reactive, ref, computed } from 'vue'

export default {
  name: 'CalculatorKeypad',
  setup () {
    let displayValue = reactive({
      statement: '',
      prev: 0,
      next: 0,
      result: computed(() => displayValue.next.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')),
      arithmetic: '',
      isNextReset: false,
      isPressResult: false
    })
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
          displayNumberValue(innerText)
          break
        case operatorReg.test(innerText):
          displayOperatorValue(innerText)
          break
        case /^[=]$/.test(innerText):
          calculate()
          break
        default:
          console.error('알 수 없는 입력값 입니다.')
      }
    }

    const displayNumberValue = (value) => {
      if (displayValue.next.length === 16) return false
      
      if (displayValue.isPressResult) {
        displayValue.statement = ''
        displayValue.next = 0
        displayValue.isPressResult = false
      }
    
      if (displayValue.isNextReset) {
        displayValue.next = 0
        displayValue.isNextReset = false
      }
      
      displayValue.next === 0 ? displayValue.next = Number(value) : displayValue.next += value
    }
    
    const displayOperatorValue = (value) => {
      const isArithmetic = /^([+\-×÷])|(\b\+\/-\b)$/.test(value)
      
      if (value === 'backspace') {
        displayValue.next.length === 1 || displayValue.next.length === undefined || displayValue.next.length === null
        ? displayValue.next = 0
        : displayValue.isPressResult 
          ? displayValue.statement = ''
          : displayValue.next = displayValue.next.slice(0, -1)
      }
      
      if (value === 'C' || value === 'CE') {
        if (value === 'CE' && displayValue.arithmetic !== '') {
          displayValue.next = 0
          return false
        }
        
        displayValue.next = 0
        displayValue.prev = 0
        displayValue.arithmetic = ''
        displayValue.statement = ''
      }
      
      if (value === '.') {
        if (displayValue.isPressResult) {
          displayValue.statement = ''
          displayValue.next = 0
          displayValue.isPressResult = false
        }
        
        displayValue.next = displayValue.result.includes('.')? displayValue.next : `${displayValue.next}${value}`
      }
      
      if (isArithmetic) {
        displayValue.arithmetic = value
        if (value === '+/-') {
          displayValue.next = -Number(displayValue.next)
          return false
        }
        
        if (displayValue.isPressResult) {
          displayValue.statement = `${displayValue.next} ${displayValue.arithmetic}`
          displayValue.prev = displayValue.next
          displayValue.next = 0
          displayValue.isPressResult = false
        } else {
          displayValue.prev = displayValue.next
          displayValue.statement = `${displayValue.next} ${displayValue.arithmetic}`
          displayValue.isNextReset = true
        }
      }
    }

    const calculate = () => {
      if (displayValue.arithmetic === '' || displayValue.prev === '' || displayValue.next === '') return false
      
      let result = 0
      
      switch (displayValue.arithmetic) {
        case '+':
          result = Number(displayValue.prev) + Number(displayValue.next)
          break
        case '-':
          result = Number(displayValue.prev) - Number(displayValue.next)
          break
        case '×':
          result = Number(displayValue.prev) * Number(displayValue.next)
          break
        case '÷':
          result = Number(displayValue.prev) / Number(displayValue.next)
          break
        default:
          console.error('알 수 없는 연산자 입니다')
          return false
      }

      displayResult(result)
    }

    const displayResult = (result) => {
      const isInfinity = !isFinite(result)
      
      displayValue.statement =
      typeof result !== 'number'
        ? '숫자가 아닌 결과값 입니다'
        : isInfinity
          ? '0으로 나눌 수 없습니다'
          : `${displayValue.prev} ${displayValue.arithmetic} ${displayValue.next} =`
      displayValue.next = isInfinity ? 0 : result
      displayValue.arithmetic = ''
      displayValue.prev = 0
      displayValue.isPressResult = true
    }

    return {
      displayValue,
      historyModalOpen,
      onKeyPressEvent,
      onClickKeyPad,
      displayNumberValue,
      displayOperatorValue,
      calculate,
      displayResult
    }
  }
}
</script>
