
const state = {
  statement: '', // 계산식
  operator: '', // 연산자
  prevNumber: 0, // 이전 숫자 입력값
  nextNumber: 0, // 다음 숫자 입력값
  isNextReset: false, // 연산자 입력 여부
  isPressResult: false, // 결과 도출 여부
  historyArray: [] // 계산식과 값 기록 배열
}

const getters = {
  calcHistoryArray: state => {
    return state.historyArray
  },
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
  if (payload === 'CE' && state.operator !== '') {
    state.nextNumber = 0
    return false
  }
  
  resetState(state, 'nextNumber', 'prevNumber', 'operator', 'statement')
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

const displayFouroperator = (state) => {
  console.log('▶️ 사칙연산자')
  state.prevNumber = state.nextNumber
  state.statement = `${state.nextNumber} ${state.operator}`
  
  if (state.isPressResult) {
    state.nextNumber = 0
    state.isPressResult = false
  } else state.isNextReset = true
}

const displayResult = (state, result) => {
  console.log('▶️ 계산 결과 표시')
  const isInfinity = !isFinite(result)
  
  if (typeof result === 'number' && !isInfinity) {
    const computedResult = String(result).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    
    state.historyArray.push(Object.assign({
      statement: `${state.prevNumber} ${state.operator} ${state.nextNumber} =`,
      result: computedResult
    }))
  }
  
  state.statement =
  typeof result !== 'number'
    ? '숫자가 아닌 결과값 입니다'
    : isInfinity
      ? '0으로 나눌 수 없습니다'
      : `${state.prevNumber} ${state.operator} ${state.nextNumber} =`
  state.nextNumber = isInfinity ? 0 : result
  state.isPressResult = true
  
  resetState(state, 'prevNumber', 'operator')
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
      
    console.group('✔️ 숫자 입력')
    console.log(`입력한 숫자 : ${payload}`)
    console.log(`연산자 이전 입력 여부? ${state.isNextReset}`)
    console.log(`결과값 도출 여부? ${state.isPressResult}, `)
    console.groupEnd()
    
    if (state.isPressResult) resetState(state, 'nextNumber', 'isPressResult', 'statement')
  
    if (state.isNextReset) resetState(state, 'nextNumber', 'isNextReset')
    
    if (state.nextNumber.length === 16) return false
    
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
        diplayNegative(state)
        break
      case /^([+\-×÷])$/.test(payload):
        state.operator = payload
        displayFouroperator(state)
        break
      default:
        console.error('알 수 없는 키패드 입력값 입니다')
    }
  },
  calculate (state) {
    console.log('✔️ 계산 실행')
    
    const isNullOperator = state.operator === '' || state.operator === null || state.operator === undefined
    const isNullPrevNumber = state.prevNumber === '' || state.prevNumber === null || state.prevNumber === undefined
    const isNullNextNumber = state.nextNumber === '' || state.nextNumber === null || state.nextNumber === undefined

    if (isNullOperator || isNullPrevNumber || isNullNextNumber) return false
    
    let result = 0
    
    switch (state.operator) {
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

    console.log(`입력한 사칙연산자: ${state.operator}, 결과값: ${result}`)
    displayResult(state, result)
  },
  changeDisplay (state, payload) {
    console.log(`✔️ 선택한 기록으로 계산 결과식 변경: ${JSON.stringify(payload)}`)
    state.statement = payload.statement
    state.nextNumber = payload.result
    state.isPressResult = true
  },
  clearHistory (state) {
    console.log('✔️ 기록 삭제')
    state.historyArray = []
  }
}

export default {
  state,
  getters,
  mutations
}