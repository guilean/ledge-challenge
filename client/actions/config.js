import {
    PHONE_VERIFICATION,
    LOAD_CONFIG_ERROR,
    PHONE_VERIFICATION_FINISH,
    EMAIL_VERIFICATION,
    EMAIL_VERIFICATION_STATUS,
    NEW_USER,
    USER_LOGIN,
    LOADING,
    ERROR
} from './types';
import Context from '../managers/Context';
import API from '../domain/API';

function _phoneVerification(payload) {
    return {
        type: PHONE_VERIFICATION,
        payload
    };
}

function _phoneVerificationFinish(payload) {
    return {
        type: PHONE_VERIFICATION_FINISH,
        payload
    };
}

function _emailVerification(payload) {
    return {
        type: EMAIL_VERIFICATION,
        payload
    };
}

function _emailVerificationStatus(payload) {
    return {
        type: EMAIL_VERIFICATION_STATUS,
        payload
    };
}

function _newUser(payload) {
    return {
        type: NEW_USER,
        payload
    };
}

function _login(payload) {
    return {
        type: USER_LOGIN,
        payload
    };
}

function _showLoading() {
    return { type: LOADING };
}

function _showError() {
    return { type: ERROR }
}

export function phone_verification(params, callback) {
    return (dispatch, getState) =>{
        dispatch(_showLoading());
        Context.domainManager.phone_verification(params,
            (success) =>{
                dispatch(_phoneVerification(success));
                callback && callback();
            },
            (error)=>{
                dispatch(_showError());
            }
        );
    };
}

export function phone_verification_finish(params, callback) {
    return (dispatch, getState) =>{
        dispatch(_showLoading());
        Context.domainManager.phone_verification_finish(params,
            (success) =>{
                dispatch(_phoneVerificationFinish(success));
                let {alternate_credentials} = success;
                let email_credential;
                if(alternate_credentials){
                    email_credential = success.alternate_credentials.data[0].credential;
                }
                if(success.status === 'passed' && alternate_credentials === null){
                    callback();
                }else if(email_credential && email_credential !== ''){
                    dispatch(email_verification({email:email_credential}, callback));
                }else{
                    dispatch(_showError());
                }
            },
            (error)=>{
                dispatch(_showError());
            }
        );
    };
}

export function email_verification(params, callback) {
    return (dispatch, getState) =>{
        dispatch(_showLoading());
        Context.domainManager.email_verification(params,
            (success) =>{
                dispatch(_emailVerification(success));
                callback && callback();
            },
            (error)=>{
                dispatch(_showError());
            }
        );
    };
}

export function email_verification_status(params, callback, user_login) {
    return (dispatch, getState) =>{
        dispatch(_showLoading());
        Context.domainManager.email_verification_status(params,
            (success) =>{
                dispatch(_emailVerificationStatus(success));
                if(success.status === 'passed'){
                    callback && callback(user_login);
                }else{
                    dispatch(_showError());
                }
            },
            (error)=>{
                dispatch(_showError());
            }
        );
    };
}

export function new_user(params, callback) {
    return (dispatch, getState) =>{
        dispatch(_showLoading());
        Context.domainManager.new_user(params,
            (success) =>{
                dispatch(_newUser(success));
                callback();
            },
            (error)=>{
                dispatch(_showError());
            }
        );
    };
}

export function login(params) {
    return (dispatch, getState) =>{
        dispatch(_showLoading());
        Context.domainManager.login(params,
            (success) =>{
                dispatch(_login(success));
            },
            (error)=>{
                dispatch(_showError());
            }
        );
    };
}
