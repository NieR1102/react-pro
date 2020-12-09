import type from '../actionTypes'

let initState = {
  goodData: {},
  cates: [],
  goodInfo: {}
}

export default function reducer(state=initState,action) {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case type.GET_GOOD_LIST:
      newState.goodData = action.payload
      break
    case type.GET_CATA_LIST:
      newState.cates = action.payload
      break
    case type.GET_GOOD_DETAIL:
      newState.goodInfo = action.payload
      break
    case type.CLEAR_GOOD_LIST:
      newState.goodInfo = {}
    default:
  }
  return newState
}