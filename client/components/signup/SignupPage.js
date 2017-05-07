import React from 'react';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/config';
import styles from '../../sass/styles.scss';

class SignupPage extends React.Component {

    render() {
        const {phone_verification, phone_verification_finish, email_verification, email_verification_status, verification_id_email, verification_id_phone, phoneVerification_loading, phoneVerification_error, new_user, alternate_credentials, login} = this.props;

        return (
            <div className="wrapper">
                <div className="col-md-4 col-md-offset-4">
                    <SignupForm
                        phoneVerification={phone_verification}
                        phoneVerificationStatus={phone_verification_finish}
                        emailVerification={email_verification}
                        emailVerificationStatus={email_verification_status}
                        verificationIdPhone={verification_id_phone}
                        verificationIdMail={verification_id_email}
                        loadingPhoneVerification={phoneVerification_loading}
                        errorPhoneVerification={phoneVerification_error}
                        createUser={new_user}
                        isRegistered={alternate_credentials}
                        login={login}
                    />
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

function mapStateToProps(state, ownProps) {
    const {status, alternate_credentials} = state.config.phoneVerification;
    const {type} = state.config.emailVerification;
    const {phoneVerification_loading, phoneVerification_error} = state.config;
    return {
        verification_id_phone: state.config.phoneVerification.verification_id ,
        verification_id_email: state.config.emailVerification.verification_id,
        status,
        phoneVerification_loading,
        phoneVerification_error,
        alternate_credentials
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
