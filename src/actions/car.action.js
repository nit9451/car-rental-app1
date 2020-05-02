import {SHOW_CAR,SET_CURRENT_CAR,BOOK_CAR,UPDATE_CAR} from "./constant"

export const SHOW_CAR_ACTION = (_data,success,error) => dispatch => {


    try{
        dispatch({
         type: SHOW_CAR,
         payload: _data
        })

        success();

    }
    catch(e){
console.log(e);
error()
    }
   }

   export const UPDATE_CAR_ACTION = (_data,success,error) => dispatch => {


    try{
        dispatch({
         type: UPDATE_CAR,
         payload: _data
        })

        success();

    }
    catch(e){
console.log(e);
error()
    }
   }


   export const SET_CURRENT_CAR_ACTION = (_data,success,error) => dispatch => {


    try{
        dispatch({
         type: SET_CURRENT_CAR,
         payload: _data
        })

        success();

    }
    catch(e){
console.log(e);
error()
    }
   }


   

   export const BOOK_CAR_ACTION = (_data,success,error) => dispatch => {


    try{
        dispatch({
         type: BOOK_CAR,
         payload: _data
        })

        success();

    }
    catch(e){
console.log(e);
error()
    }
   }