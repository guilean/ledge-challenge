import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import styles from '../../sass/styles.scss';
import {cyan500, cyan600} from 'material-ui/styles/colors';
import ReactPhoneInput from 'react-phone-input';
import {formatPhone, formatCountryCode, parseSecret} from '../../utils/UtilsFormat';

const ResendCode = ({onClick}) => {
    return (
        <IconButton tooltip="Resend code" tooltipPosition="top-center">
            <FontIcon onClick={onClick} className="material-icons resend-code" hoverColor={cyan600} color={cyan500}>refresh</FontIcon>
        </IconButton>
    );
}

const StepperBody = ({header, information, loading, error}) => {
    return (
        <div>
            <h4 className="title-stepper">{header}</h4>
            {loading && <CircularProgress className="spinner" size={20}/>}
            {error && <p className="alert alert-danger">An error occurred.</p>}
            <p>{information}</p>
        </div>
    );
}

class SignupForm extends React.Component {

    state = {
        loading: false,
        finished: false,
        stepIndex: 0,
        country_code: '',
        phone_number: '',
        secret: '',
        email: '',
    };

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
        const {phoneVerification, phoneVerificationStatus, verification_id, emailVerification, loadingPhoneVerification, errorPhoneVerification, isRegistered} = this.props;

        switch (stepIndex) {
            case 0:
                return (
                    <div>
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
                    <div>
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
                    <div>
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
        const {phoneVerification, phoneVerificationStatus, verification_id, emailVerification, createUser} = this.props;
        let data_points = {data:
                [{
                    email,
                    data_type: 'email'
                },
                {
                    phone_number,
                    data_type: 'phone',
                    verification: {
                        secret,
                        verification_id
                    },
                    country_code
                }],
            type: "list"
        }

        switch (stepIndex) {
            case 0:
                phoneVerification({phone_number, country_code}, this.handleNext);
            break;
            case 1:
                phoneVerificationStatus({secret, verification_id}, this.handleNext);
            break;
            case 2:
                debugger;
                emailVerification({email});
                createUser({data_points}, this.handleNext);
            break;
            default:

        }
    }

    renderContent() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px', overflow: 'hidden'};

        if (finished) {
            return (
                <div style={contentStyle}>
                    <p>
                        <a href="#" onClick={(event) => {
                                event.preventDefault();
                                this.setState({stepIndex: 0, finished: false});
                            }}
                        >
                        User create successfully
                    </a> Click to reset the example.
                    </p>
                </div>
            );
        }

        return (
            <div className="stepper">
                <div>{this.getStepContent(stepIndex)}</div>
                <div style={{marginTop: 24, marginBottom: 12}}>
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

    render() {
        const {loading, stepIndex} = this.state;

        return (
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                <ExpandTransition loading={loading} open={true}>
                    {this.renderContent()}
                </ExpandTransition>
            </div>
        );
    }
}

SignupForm.propTypes = {
    phoneVerification: PropTypes.func.isRequired,
    phoneVerificationId: PropTypes.string,
    emailVerification: PropTypes.func.isRequired,
    phoneVerificationStatus: PropTypes.func
}

SignupForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default SignupForm;
