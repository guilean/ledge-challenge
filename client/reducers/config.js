import { PHONE_VERIFICATION, LOAD_CONFIG_ERROR } from '../actions/types';

const initialState = {
    userData: {}
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case PHONE_VERIFICATION:
            return {
                userData: action.payload
            };
        default: return state;
    }
}
