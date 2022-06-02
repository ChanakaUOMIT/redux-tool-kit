const redux = require('redux')
const createStore = redux.createStore
const bindActionCreator = redux.bindActionCreators
const combineReducers = redux.combineReducers

console.log('From index.js')

// Type
const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_REORDERED = 'ICECREAM_REORDERED'

// Action
function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  }
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    quantity: qty,
  }
}

function orderIceCream() {
  return {
    type: ICECREAM_ORDERED,
    quantity: 1,
  }
}

function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_REORDERED,
    quantity: qty,
  }
}

// Reducer
// const initialState = {
//   numOfCakes: 10,
//   numOfIceCream: 20,
// }

const initialCakeState = {
  numOfCakes: 10,
}

const initialIceCreamState = {
  numOfIceCream: 20,
}

// (previousState, action) => newState
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      }
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.quantity,
      }
    default:
      return state
  }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - 1,
      }
    case ICECREAM_REORDERED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream + action.quantity,
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
})

const store = createStore(rootReducer)
console.log('Initial state : ', store.getState())

const unsubscribe = store.subscribe(() =>
  console.log('Update state : ', store.getState())
)

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())

// store.dispatch(restockCake(3))
// store.dispatch(restockCake())

const action = bindActionCreator(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
)
action.orderCake()
action.orderCake()
action.orderCake()
action.restockCake(2)
action.restockCake()

action.orderIceCream()
action.orderIceCream()
action.restockIceCream(2)

unsubscribe()
