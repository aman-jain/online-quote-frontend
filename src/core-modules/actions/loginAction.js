import * as types from '../actionTypes';
import axios from 'axios';
import config from '../../../config/base';

export function loginSuccess(result) { 
    const data = {
        firstName: result.firstName,
        lastName: result.lastName,
        loggedIn: true,
        response: result.status,
    }
    console.log(data);
    return { type: types.LOGIN_SUCCESS, data }; 
}
export function loginFailed(status) { 
    const data = {
        loggedIn: false,
        response: status,
    }
    return { type: types.LOGIN_FAILED, data }; 
}

export function loginAction(userName, password){
    return (dispatch) => {
        const data = { 
            userName: userName, 
            password: password,
        };
        const apiEndPoint = config.env.apiEndPoint;
        axios({
            method: 'POST',
            data: data,
            url: `${apiEndPoint}/authenticate`,
            headers: {
                'content-type': 'application/json',
            },
        }).then(results => {
            if(results.data.status === 'ok'){
                console.log(results);
                return dispatch(loginSuccess(results.data));
            }
            return dispatch(loginFailed(results.data.status));
        })
    }
}


