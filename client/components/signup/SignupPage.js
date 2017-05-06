import React from 'react';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/config';
import styles from '../../sass/styles.scss';

class SignupPage extends React.Component {

    render() {
        const {phone_verification, phone_verification_finish, email_verification, verification_id} = this.props;

        return (
            <div className="wrapper">
                <div className="col-md-4 col-md-offset-4">
                    <SignupForm
                        phoneVerification={phone_verification}
                        phoneVerificationStatus={phone_verification_finish}
                        emailVerification={email_verification}
                        verification_id={verification_id}
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
    debugger;
    let {verification_id, status} = state.config.phoneVerification;
    return {
        verification_id,
        status
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
