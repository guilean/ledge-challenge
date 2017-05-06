import { PHONE_VERIFICATION, LOAD_CONFIG_ERROR, PHONE_VERIFICATION_FINISH, LOADING } from '../actions/types';

const initialState = {
    userData: {},
    phoneVerification: {
        verification_id: '',
        status: ''
    },
    loading_phone_verification: false
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case PHONE_VERIFICATION:
            return {
                ...state,
                phoneVerification: action.payload,
            };
        case PHONE_VERIFICATION_FINISH:
            return {
                ...state,
                phoneVerification: action.payload,
            };
        case LOADING:
            return {
                ...state,
                loading_phone_verification: true
            };
        default: return state;
    }
}
