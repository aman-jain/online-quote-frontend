import * as types from '../actionTypes';

const initialState = {
    firstName: undefined,
    lastName: undefined,
    loggedIn: sessionStorage.loggedIn?sessionStorage.loggedIn:false,
    response: undefined
}

export default function (state = initialState, action){
    switch(action.type){
    case types.LOGIN_SUCCESS:
        const successData = Object.assign({}, state, action.data);
        sessionStorage.loggedIn = successData.loggedIn;
        return successData;
    case types.LOGIN_FAILED:
        const failData = Object.assign({}, state, action.data);
        return failData;
    default:
        return state;

    }
    
}
