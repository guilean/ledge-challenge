import React from 'react';
import PropTypes from 'prop-types';

import {formatPhone, formatCountryCode, parseSecret, formatLoginParams, formatUserParams, isEmptyObject} from '../../utils/UtilsFormat';

const initialState = {
    loading: false,
    finished: false,
    stepIndex: 0,
    country_code: '',
    phone_number: '',
    secret: '',
    email: '',
    user_id: '',
    user_token: '',
};

class SignupForm extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div className="wrapper-ui">
                <span>pepesss</span>
            </div>
        );
    }
}

SignupForm.propTypes = {

};

SignupForm.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SignupForm;
