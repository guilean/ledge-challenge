import { PHONE_VERIFICATION, LOAD_CONFIG_ERROR, PHONE_VERIFICATION_FINISH } from '../actions/types';

const initialState = {
    userData: {},
    phoneVerification: {},
    loading_phone_verification: false
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case PHONE_VERIFICATION:
            return {
                phoneVerification: action.payload
            };
        case PHONE_VERIFICATION_FINISH:
        debugger;
            return {
                phoneVerification: action.payload
            };
        default: return state;
    }
}
