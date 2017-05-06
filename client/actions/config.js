import {
    PHONE_VERIFICATION,
    LOAD_CONFIG_ERROR,
    PHONE_VERIFICATION_FINISH,
    EMAIL_VERIFICATION,
    EMAIL_VERIFICATION_STATUS,
    NEW_USER,
    LOGIN,
    LOADING,
    ERROR
} from './types';
// import Context from '../managers/Context';
import API from '../domain/API';

function phoneVerification(payload) {
    return {
        type: PHONE_VERIFICATION,
        payload
    };
}

function phoneVerificationFinish(payload) {
    return {
        type: PHONE_VERIFICATION_FINISH,
        payload
    };
}

function emailVerification(payload) {
    return {
        type: EMAIL_VERIFICATION,
        payload
    };
}

function emailVerificationStatus(payload) {
    return {
        type: EMAIL_VERIFICATION_STATUS,
        payload
    };
}

function newUser(payload) {
    return {
        type: NEW_USER,
        payload
    };
}

function login(payload) {
    return {
        type: LOGIN,
        payload
    };
}

function showLoading() {
    return { type: LOADING };
}

function showError() {
    return { type: ERROR }
}

export function phone_verification(params, callback) {
    debugger;
    return (dispatch, getState) =>{
        dispatch(showLoading());
        API.prototype.phone_verification(params,
            (success) =>{
                dispatch(phoneVerification(success));
                callback && callback();
            },
            (error)=>{
                dispatch(showError());
            }
        );
    };
}

export function phone_verification_finish(params, callback) {
    return (dispatch, getState) =>{
        dispatch(showLoading());
        API.prototype.phone_verification_finish(params,
            (success) =>{
                dispatch(phoneVerificationFinish(success));
                callback();
            },
            (error)=>{
                dispatch(showError());
            }
        );
    };
}

export function email_verification(params, callback) {
    return (dispatch, getState) =>{
        dispatch(showLoading());
        API.prototype.email_verification(params,
            (success) =>{
                dispatch(emailVerification(success));
                callback();
            },
            (error)=>{
                dispatch(showError());
            }
        );
    };
}

export function email_verification_status(params) {
    return (dispatch, getState) =>{
        API.prototype.email_verification_status(params,
            (success) =>{
                dispatch(emailVerificationStatus(success));
            },
            (error)=>{
                dispatch(showError("ERROR"));
            }
        );
    };
}

export function new_user(params) {
    return (dispatch, getState) =>{
        API.prototype.new_user(params,
            (success) =>{
                dispatch(newUser(success));
            },
            (error)=>{
                dispatch(showError("ERROR"));
            }
        );
    };
}

export function login(params) {
    return (dispatch, getState) =>{
        API.prototype.login(params,
            (success) =>{
                dispatch(login(success));
            },
            (error)=>{
                dispatch(showError("ERROR"));
            }
        );
    };
}
