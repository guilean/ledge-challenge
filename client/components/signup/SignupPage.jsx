import React from 'react';
import SignupForm from './SignupForm';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as actions from '../../actions/config';

export default class SignupPage extends React.Component {

    render() {

        return (
            <div className="wrapper">
                <div className="col-md-4 col-md-offset-4">
                    <SignupForm />
                </div>
            </div>
        );
    }
}

// function mapDispatchToProps(dispatch) {
//     const {phone_verification, phone_verification_finish, email_verification, email_verification_status, new_user, login} = bindActionCreators(actions, dispatch);
//     return {
//         phone_verification,
//         phone_verification_finish,
//         email_verification,
//         email_verification_status,
//         new_user,
//         login
//     }
// }
//
// function mapStateToProps(state, ownProps) {
//     const {status, alternate_credentials} = state.config.phoneVerification;
//     const {userData} = state.config;
//     const {type} = state.config.emailVerification;
//     const {phoneVerification_loading, phoneVerification_error} = state.config;
//     return {
//         verification_id_phone: state.config.phoneVerification.verification_id ,
//         verification_id_email: state.config.emailVerification.verification_id,
//         status,
//         phoneVerification_loading,
//         phoneVerification_error,
//         alternate_credentials,
//         userData
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
