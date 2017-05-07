import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {cyan500, cyan600} from 'material-ui/styles/colors';
import ReactPhoneInput from 'react-phone-input';
import styles from '../../sass/styles.scss';
import {formatPhone, formatCountryCode, parseSecret, formatLoginParams, formatUserParams, isEmptyObject} from '../../utils/UtilsFormat';

const ResendCode = ({onClick}) => {
    return (
        <IconButton tooltip="Resend code" tooltipPosition="top-center">
            <FontIcon onClick={onClick} className="material-icons resend-code" hoverColor={cyan600} color={cyan500}>refresh</FontIcon>
        </IconButton>
    );
}

const StepperBody = ({header, information, loading, error}) => {
    return (
        <div className="stepper-panel">
            <h4 className="title-stepper">{header}</h4>
            {loading && <CircularProgress className="spinner" size={20}/>}
            {error && <p className="alert alert-danger">An error occurred.</p>}
            <p>{information}</p>
        </div>
    );
}

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
        super(props)
        this.state = initialState;
    }

    componentWillReceiveProps(nextProps){
        if(!isEmptyObject(nextProps.userData)){
            this.setState({user_id:nextProps.userData.user_id, user_token: nextProps.userData.user_token})
        }
    }

    handleOnChange = (value) => {
        let country_code = formatCountryCode(value);
        let phone_number = formatPhone(value);
        this.setState({
            phone_number: phone_number,
            country_code: country_code
        });
   }

    dummyAsync = (cb) => {
        this.setState({loading: true}, () => {
            this.asyncTimer = setTimeout(cb, 500);
        });
    };

    handleNext = () => {
        const {stepIndex, loading} = this.state;
        if (!loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 2,
            }));
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
            loading: false,
            stepIndex: stepIndex - 1,
            }));
        }
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.name === 'secret' ? parseSecret(target.value) : target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    getStepContent(stepIndex) {
        const {country_code, phone_number, secret, email} = this.state;
        const {phoneVerification, phoneVerificationStatus, verificationIdPhone, emailVerification, loadingPhoneVerification, errorPhoneVerification, isRegistered} = this.props;

        switch (stepIndex) {
            case 0:
                return (
                    <div className="stepper-wrapper">
                        <StepperBody
                            loading={loadingPhoneVerification}
                            error={errorPhoneVerification}
                            header="Get Started"
                            information="We'll send a one-time SMS to verify your phone number. Carrier SMS fees may apply."
                        />
                        <ReactPhoneInput onlyCountries={['us','es']} defaultCountry={'us'} onChange={this.handleOnChange}/>
                    </div>
                );
            case 1:
                return (
                    <div className="stepper-wrapper">
                        <StepperBody
                            loading={loadingPhoneVerification}
                            error={errorPhoneVerification}
                            header={"Verify " + phone_number}
                            information="We've sent a verification code to the phone number listed above.
                                Enter it below or go to previous step to change the phone number."
                        />
                        <TextField className="textfield" name="secret" value={secret} onChange={this.handleInputChange} floatingLabelText="Verification code" />
                        <ResendCode onClick={() => phoneVerification({phone_number, country_code})} />
                    </div>
                );
            case 2:
                return (
                    <div className="stepper-wrapper">
                        <StepperBody
                            loading={loadingPhoneVerification}
                            error={errorPhoneVerification}
                            header={isRegistered ? 'Email verification' : 'Personal information'}
                        />
                    {isRegistered ? <p>Confirmation email sent to <b>{isRegistered.data[0].credential}</b>. Waiting for email verification confirmation. Please check your email</p> :
                    <TextField className="textfield" type="email" name="email" value={email} onChange={this.handleInputChange} floatingLabelText="Email" />}
                    </div>
                );
            default:
                return 'No information';
        }
    }

    actions = () => {
        const {stepIndex, country_code, phone_number, secret, email} = this.state;
        const {phoneVerification, phoneVerificationStatus, verificationIdMail, verificationIdPhone, emailVerification, createUser, isRegistered, login, emailVerificationStatus} = this.props;
        let email_registered = isRegistered && isRegistered.data[0].credential;

        switch (stepIndex) {
            case 0:
                phoneVerification({phone_number, country_code}, this.handleNext);
            break;
            case 1:
                phoneVerificationStatus({secret, verification_id: verificationIdPhone}, this.handleNext);
            break;
            case 2:
                if(isRegistered){
                    let user_login = formatLoginParams(email_registered, phone_number, secret, verificationIdMail, verificationIdPhone, country_code);
                    emailVerificationStatus(verificationIdMail, login, user_login);
                }else{
                    let data_points = formatUserParams(email, phone_number, secret, verificationIdPhone, country_code);
                    emailVerification({email});
                    createUser({data_points}, this.handleNext);
                }
            break;
            default:
        }
    }

    renderContent() {
        const {finished, stepIndex} = this.state;

        if (finished) {
            return (
                <div className="alert alert-success">
                    <h4>User created successfully</h4>
                    <p>
                        <a href="#" onClick={(event) => {
                                event.preventDefault();
                                this.setState(initialState);
                            }}
                        >
                        Click here to reset the example.
                        </a>
                    </p>
                </div>
            );
        }

        return (
            <div className="stepper">
                <div>{this.getStepContent(stepIndex)}</div>
                <div className="btn-actions">
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        onTouchTap={this.handlePrev}
                        style={{marginRight: 12}}
                    />
                    <RaisedButton
                        label={stepIndex === 2 ? 'Finish' : 'Next'}
                        primary={true}
                        onTouchTap={this.actions}
                    />
                </div>
            </div>
        );
    }

    userLogged = () => {
        const {user_id, user_token} = this.state;
        return (
            <div className="alert alert-success">
                <h4>Yey! You have been logged in successfully!</h4>
                <p><b>user_id: </b><span className="text-wrap">{user_id}</span></p>
                <p><b>user_token: </b><span className="text-wrap">{user_token}</span></p>
            </div>
        );
    }

    render() {
        const {loading, stepIndex, user_id} = this.state;
        let renderContent = user_id !== '' ? this.userLogged() :
            <ExpandTransition loading={loading} open={true}>
                {this.renderContent()}
            </ExpandTransition>

        return (
            <div className="wrapper-ui">
                {renderContent}
            </div>
        );
    }
}

SignupForm.propTypes = {
    phoneVerification: PropTypes.func.isRequired,
    phoneVerificationId: PropTypes.string,
    emailVerification: PropTypes.func.isRequired,
    phoneVerificationStatus: PropTypes.func,
    phoneVerification: PropTypes.func,
    phoneVerificationStatus: PropTypes.func,
    emailVerification: PropTypes.func,
    emailVerificationStatus: PropTypes.func,
    verificationIdPhone: PropTypes.string,
    verificationIdMail: PropTypes.string,
    loadingPhoneVerification: PropTypes.bool,
    errorPhoneVerification: PropTypes.bool,
    createUser: PropTypes.func,
    isRegistered: PropTypes.object,
    login: PropTypes.func
}

SignupForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default SignupForm;
