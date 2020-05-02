import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import logger from "redux-logger"
import reduceReducers from "reduce-reducers"
import carreducer from "./reducers/car.reducer"
import {carDetails} from "./data/cardetails"

export default ()=>{

  const reducers=reduceReducers(
    carreducer,
    
  )
  const devTool=window.__REDUX_DEVTOOLS_EXTENSION__&&
  window.__REDUX_DEVTOOLS_EXTENSION__();
const store=createStore(
  reducers,
  {
    carDetails:carDetails,
    customerDetails:[],
    currentCar:{}
  }
,
  compose(applyMiddleware(thunk,logger),devTool)

);

return store;


}









// export default function configureStore()

// {
//  return createStore(
//   rootReducer,
// {
   
//    car_details:[1,2,3]
//   },
//   compose(applyMiddleware(thunk,logger),devTool)
//  );
// }