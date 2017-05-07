import {
    PHONE_VERIFICATION,
    LOAD_CONFIG_ERROR,
    PHONE_VERIFICATION_FINISH,
    LOADING,
    EMAIL_VERIFICATION,
    ERROR,
    NEW_USER,
    USER_LOGIN,
    EMAIL_VERIFICATION_STATUS
} from '../actions/types';

const initialState = {
    userData: {},
    phoneVerification: {
        verification_id: '',
        status: ''
    },
    phoneVerification_loading: false,
    phoneVerification_error: false,
    emailVerification: {
        type: '',
        verification_id: '',
        status: '',
        alternate_credentials: null
    }
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case PHONE_VERIFICATION:
            return {
                ...state,
                phoneVerification: action.payload,
                phoneVerification_loading: false,
                phoneVerification_error: false,
            };
        case PHONE_VERIFICATION_FINISH:
            return {
                ...state,
                phoneVerification: action.payload,
                phoneVerification_loading: false,
                phoneVerification_error: false,
            };
        case NEW_USER:
            return {
                ...state,
                phoneVerification_loading: false,
                phoneVerification_error: false,
            };
        case EMAIL_VERIFICATION:
            return {
                ...state,
                emailVerification: action.payload,
                phoneVerification_loading: false,
                phoneVerification_error: false
            };
        case EMAIL_VERIFICATION_STATUS:
            return {
                ...state,
                emailVerification: action.payload,
                phoneVerification_loading: false,
                phoneVerification_error: false
            };
        case USER_LOGIN:
            return {
                ...state,
                userData: action.payload,
                phoneVerification_loading: false,
                phoneVerification_error: false
            };
        case ERROR:
            return {
                ...state,
                phoneVerification_error: true,
                phoneVerification_loading: false
            };
        case LOADING:
            return {
                ...state,
                phoneVerification_loading: true,
                phoneVerification_error: false,
            };
        default: return state;
    }
}
