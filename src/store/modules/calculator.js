
const state = {
  statement: '',
  arithmetic: '',
  prevNumber: 0,
  nextNumber: 0,
  isNextReset: false,
  isPressResult: false
}

const getters = {
  calcResult: state => {
    return state.nextNumber.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
  }
}

const displayBackSpace = (state) => {
  console.log('▶️ 입력값 삭제')
  state.nextNumber.length === 1 || state.nextNumber.length === undefined || state.nextNumber.length === null
  ? state.nextNumber = 0
  : state.isPressResult 
    ? state.statement = ''
    : state.nextNumber = state.nextNumber.slice(0, -1)
}

const displayClear = (state, payload) => {
  console.log('▶️ 입력값 리셋')
  if (payload === 'CE' && state.arithmetic !== '') {
    state.nextNumber = 0
    return false
  }
  
  resetState(state, 'nextNumber', 'prevNumber', 'arithmetic', 'statement')
}

const displayDot = (state, payload) => {
  console.log('▶️ 소수점 추가')
  if (state.isPressResult) resetState(state, 'nextNumber', 'isPressResult', 'statement')
  
  state.nextNumber = String(state.nextNumber).includes('.')? state.nextNumber : `${state.nextNumber}${payload}`
}

const diplayNegative = (state) => {
  console.log('▶️ 양수/음수 전환')
  state.nextNumber = -Number(state.nextNumber)
}

const displayArithmetic = (state) => {
  console.log('▶️ 사칙연산자')
  if (state.isPressResult) {
    state.prevNumber = state.nextNumber
    state.statement = `${state.nextNumber} ${state.arithmetic}`
    state.nextNumber = 0
    state.isPressResult = false
  } else {
    state.prevNumber = state.nextNumber
    state.statement = `${state.nextNumber} ${state.arithmetic}`
    state.isNextReset = true
  }
}

const displayResult = (state, result) => {
  console.log('▶️ 계산 결과 표시')
  const isInfinity = !isFinite(result)
    
  state.statement =
  typeof result !== 'number'
    ? '숫자가 아닌 결과값 입니다'
    : isInfinity
      ? '0으로 나눌 수 없습니다'
      : `${state.prevNumber} ${state.arithmetic} ${state.nextNumber} =`
  state.nextNumber = isInfinity ? 0 : result
  state.isPressResult = true
  resetState(state, 'prevNumber', 'arithmetic')
}

const resetState = (state, ...args) => {
  args.forEach(arg => {
    if (arg.includes('Number')) state[arg] = 0
    else if (arg.includes('is')) state[arg] = false
    else state[arg] = ''
  })
}

const mutations = {
  displayNumberValue (state, payload) {
    if (state.nextNumber.length === 16) return false
      
    console.group('✔️ 숫자 입력')
    console.log(`입력한 숫자 : ${payload}`)
    console.log(`연산자 이전 입력 여부? ${state.isNextReset}`)
    console.log(`결과값 도출 여부? ${state.isPressResult}, `)
    console.groupEnd()
    
    if (state.isPressResult) resetState(state, 'nextNumber', 'isPressResult', 'statement')
  
    if (state.isNextReset) resetState(state, 'nextNumber', 'isNextReset')
    
    state.nextNumber === 0 ? state.nextNumber = Number(payload) : state.nextNumber += payload
  },
  displayOperatorValue (state, payload) {
    console.log(`✔️ 연산자 입력: ${payload}`)
    
    switch (true) {
      case payload === 'backspace':
        displayBackSpace(state)
        break
      case payload === 'C':
      case payload === 'CE':
        displayClear(state, payload)
        break
      case payload === '.':
        displayDot(state, payload)
        break
      case payload === '+/-':
        state.arithmetic = payload
        diplayNegative(state)
        break
      case /^([+\-×÷])$/.test(payload):
        state.arithmetic = payload
        displayArithmetic(state)
        break
      default:
        console.error('알 수 없는 키패드 입력값 입니다')
    }
  },
  calculate (state) {
    console.log('✔️ 계산 실행')
    
    const isNullArithmetic = state.arithmetic === '' || state.arithmetic === null || state.arithmetic === undefined
    const isNullPrevNumber = state.prevNumber === '' || state.prevNumber === null || state.prevNumber === undefined
    const isNullNextNumber = state.nextNumber === '' || state.nextNumber === null || state.nextNumber === undefined

    if (isNullArithmetic || isNullPrevNumber || isNullNextNumber) return false
    
    let result = 0
    
    switch (state.arithmetic) {
      case '+':
        result = Number(state.prevNumber) + Number(state.nextNumber)
        break
      case '-':
        result = Number(state.prevNumber) - Number(state.nextNumber)
        break
      case '×':
        result = Number(state.prevNumber) * Number(state.nextNumber)
        break
      case '÷':
        result = Number(state.prevNumber) / Number(state.nextNumber)
        break
      default:
        console.error('알 수 없는 연산자 입니다')
        return false
    }

    console.log(`입력한 사칙연산자: ${state.arithmetic}, 결과값: ${result}`)
    displayResult(state, result)
  }
}

export default {
  state,
  getters,
  mutations
}