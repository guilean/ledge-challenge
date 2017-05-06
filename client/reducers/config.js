import { PHONE_VERIFICATION, LOAD_CONFIG_ERROR, PHONE_VERIFICATION_FINISH, LOADING, EMAIL_VERIFICATION, ERROR } from '../actions/types';

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
            };
        case PHONE_VERIFICATION_FINISH:
            return {
                ...state,
                phoneVerification: action.payload,
                phoneVerification_loading: false,
            };
        case LOADING:
        debugger;
            return {
                ...state,
                phoneVerification_loading: true
            };
        case EMAIL_VERIFICATION:
            return {
                ...state,
                emailVerification: action.payload,
                phoneVerification_loading: false
            };
        case ERROR:
            return {
                ...state,
                phoneVerification_error: true,
                phoneVerification_loading: false
            };
        default: return state;
    }
}
