
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

const displayResult = (state, result) => {
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
      
    if (state.isPressResult) resetState(state, 'nextNumber', 'isPressResult', 'statement')
  
    if (state.isNextReset) resetState(state, 'nextNumber', 'isNextReset')
    
    state.nextNumber === 0 ? state.nextNumber = Number(payload) : state.nextNumber += payload
  },
  displayOperatorValue (state, payload) {
    const isArithmetic = /^([+\-×÷])$/.test(payload)
      
    if (payload === 'backspace') {
      state.nextNumber.length === 1 || state.nextNumber.length === undefined || state.nextNumber.length === null
      ? state.nextNumber = 0
      : state.isPressResult 
        ? state.statement = ''
        : state.nextNumber = state.nextNumber.slice(0, -1)
    }
    
    if (payload === 'C' || payload === 'CE') {
      if (payload === 'CE' && state.arithmetic !== '') {
        state.nextNumber = 0
        return false
      }
      
      resetState(state, 'nextNumber', 'prevNumber', 'arithmetic', 'statement')
    }
    
    if (payload === '.') {
      if (state.isPressResult) resetState(state, 'nextNumber', 'isPressResult', 'statement')
      
      state.nextNumber = state.nextNumber.includes('.')? state.nextNumber : `${state.nextNumber}${payload}`
    }
    
    if (payload === '+/-') {
      state.arithmetic = payload
      state.nextNumber = -Number(state.nextNumber)
    }
    
    if (isArithmetic) {
      state.arithmetic = payload
      
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
  },
  calculate (state) {
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

    displayResult(state, result)
  }
}

export default {
  state,
  getters,
  mutations
}