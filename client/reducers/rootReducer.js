import { combineReducers } from 'redux';

import flashMessages from './flashMessages';
import auth from './auth';
import config from './config';

export default combineReducers({
    flashMessages,
    auth,
    config
});
