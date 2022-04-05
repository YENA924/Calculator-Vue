<template>
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
import { useStore } from 'vuex'

export default {
  name: 'CalculatorKeypad',
  setup () {
    const store = useStore()
    
    const onClickKeyPad = (event) => {
      // 클릭한 버튼 내 텍스트
      const innerText = event.target.innerText
      
      if (innerText === undefined || innerText === null || innerText === '') return false
      
      // 숫자, 연산자 정규표현식
      const numberReg = /^[0-9]$/
      const operatorReg = /^([+\-.×÷])|(C|\bCE\b|\bbackspace\b|\b\+\/-\b)$/
      
      switch (true) { // 클릭한 버튼 내 텍스트가 숫자인지, 연산자 인지에 따른 분기처리
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

    const displayNumberValue = (value) => store.commit('displayNumberValue', value)
    
    const displayOperatorValue = (value) => store.commit('displayOperatorValue', value)

    const calculate = () => store.commit('calculate')

    return {
      onClickKeyPad,
      displayNumberValue,
      displayOperatorValue,
      calculate
    }
  }
}
</script>
