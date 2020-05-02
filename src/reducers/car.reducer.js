import {SHOW_CAR,SET_CURRENT_CAR,BOOK_CAR,UPDATE_CAR} from "../actions/constant"


export default (state = {}, action) => {
    switch (action.type) {
     case SHOW_CAR:
      return {
        ...state,
        car_details: action.payload
      }
      case UPDATE_CAR:
      return {
        ...state,
        car_details: action.payload
      }
      case SET_CURRENT_CAR:
        return {

          ...state,
          currentCar: action.payload
        }

        case BOOK_CAR:
        return {

          ...state,
          customerDetails: [...state.customerDetails,action.payload]
        }
     default:
      return state
    }
   }