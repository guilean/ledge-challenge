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

// Valido móvil
// Envío el correo de las credenciales alternativas
// Muestro pantalla de... Se te ha enviado un correo, validalo y haz clic aquí para loguearte
// En ese caso comprobamos la llamada del status del correo, si es passed, enviamos toda la información al login endpoint

export function phone_verification_finish(params, callback) {
    return (dispatch, getState) =>{
        dispatch(showLoading());
        API.prototype.phone_verification_finish(params,
            (success) =>{
                dispatch(phoneVerificationFinish(success));
                if(success.status === 'passed' && success.alternate_credentials === null){
                    callback();
                }else if(success.alternate_credentials !== null){
                    dispatch(email_verification({email:success.alternate_credentials.data[0].credential}, callback));
                }else{
                    dispatch(showError());
                }
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
                callback && callback();
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
                dispatch(showError());
            }
        );
    };
}

export function new_user(params, callback) {
    return (dispatch, getState) =>{
        dispatch(showLoading());
        API.prototype.new_user(params,
            (success) =>{
                dispatch(newUser(success));
                callback();
            },
            (error)=>{
                dispatch(showError());
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
