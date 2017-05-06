import {
    PHONE_VERIFICATION,
    LOAD_CONFIG_ERROR,
    PHONE_VERIFICATION_FINISH,
    EMAIL_VERIFICATION,
    EMAIL_VERIFICATION_STATUS,
    NEW_USER,
    LOGIN
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

function showError(error) {
    return { type: LOAD_CONFIG_ERROR ,error:error}
}

export function phone_verification(params) {
    return (dispatch, getState) =>{
        API.prototype.phone_verification(params,
            (success) =>{
                dispatch(phoneVerification(params));
            },
            (error)=>{
                dispatch(showError("ERROR"));
            }
        );
    };
}

export function phone_verification_finish(params) {
    return (dispatch, getState) =>{
        API.prototype.phone_verification_finish(params,
            (success) =>{
                dispatch(phoneVerificationFinish(params));
            },
            (error)=>{
                dispatch(showError("ERROR"));
            }
        );
    };
}

export function email_verification(params) {
    return (dispatch, getState) =>{
        API.prototype.email_verification(params,
            (success) =>{
                dispatch(emailVerification(params));
            },
            (error)=>{
                dispatch(showError("ERROR"));
            }
        );
    };
}

export function email_verification_status(params) {
    return (dispatch, getState) =>{
        API.prototype.email_verification_status(params,
            (success) =>{
                dispatch(emailVerificationStatus(params));
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
                dispatch(newUser(params));
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
                dispatch(login(params));
            },
            (error)=>{
                dispatch(showError("ERROR"));
            }
        );
    };
}
