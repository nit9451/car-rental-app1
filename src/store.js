import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import logger from "redux-logger"
import reduceReducers from "reduce-reducers"
import carreducer from "./reducers/car.reducer"
import {carDetails} from "./data/cardetails"
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
export default ()=>{

  const reducers=reduceReducers(
    carreducer,
    
  )
  const devTool = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null
  
const store=createStore(
  reducers,
  {
    carDetails:carDetails,
    customerDetails:[],
    currentCar:{}
  }
,
  composeWithDevTools(
    /* logger must be the last middleware in chain to log actions */
    applyMiddleware(thunk, logger)  
)
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