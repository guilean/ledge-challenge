import React from 'react';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/config';
import styles from '../../sass/styles.scss';

class SignupPage extends React.Component {

    render() {
        const {phone_verification} = this.props;
        // this.props.phone_verification({"phone_number":"4232050478","country_code":"1"});
        const a = this.props;
        return (
            <div className="wrapper">
                <div className="col-md-4 col-md-offset-4">
                    <SignupForm phoneVerification={phone_verification}/>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    const {phone_verification, phone_verification_finish, email_verification, email_verification_status, new_user, login} = bindActionCreators(actions, dispatch);
    return {
        phone_verification,
        phone_verification_finish,
        email_verification,
        email_verification_status,
        new_user,
        login
    }
}

export default connect(null, mapDispatchToProps)(SignupPage);
