const redux = require('redux')
const createStore = redux.createStore
const produce = require('immer').produce
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger

const initialState = {
  name: 'Chanaka',
  address: {
    street: '45/2, Wijayamangalarama Rd',
    city: 'Nugegoda',
    state: 'wp',
  },
}

const STREET_UPDATED = 'STREET_UPDATED'

const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    street: street,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      // return {
      //   ...state,
      //   address: {
      //     ...state.address,
      //     street: action.street,
      //   },
      // }
      return produce(state, (draft) => {
        draft.address.street = action.street
      })
    default:
      return state
  }
}

const store = createStore(reducer)
console.log('Initial state : ', store.getState())

const unsubscribe = store.subscribe(() =>
  console.log('Update state : ', store.getState())
)

store.dispatch(updateStreet('45/2 updated'))

unsubscribe()
