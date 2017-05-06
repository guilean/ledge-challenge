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
import styles from '../../sass/styles.scss';
import ReactPhoneInput from 'react-phone-input';
import {formatPhone, formatCountryCode} from '../../utils/UtilsFormat';

class SignupForm extends React.Component {

    state = {
        loading: false,
        finished: false,
        stepIndex: 0,
        country_code: '',
        phone_number: '',
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
        const {stepIndex} = this.state;
        if (!this.state.loading) {
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

    handleChangeSelect = (event, index, country_code) => this.setState({country_code});
    handleChangeText = (event, index, phone_number) => this.setState({phone_number: event.target.value});

    getStepContent(stepIndex) {
        const {phone_number} = this.state;
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <h4>Get started</h4>
                        <p>We'll send a one-time SMS to verify your phone number. Carrier SMS fees may apply.</p>
                        <ReactPhoneInput onlyCountries={['us','es']} defaultCountry={'us'} onChange={this.handleOnChange}/>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <h4>Verify {phone_number}</h4>
                        <p>We've sent a verification code to the phone number listed above.
                            Enter it below or go to previous step to change the phone number.
                        </p>
                        <TextField className="textfield" onChange={this.handleChangeText} floatingLabelText="Verification code" />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h4>Personal information</h4>
                        <TextField className="textfield" onChange={this.handleChangeText} floatingLabelText="Email" />
                    </div>
                );
            default:
                return 'No information';
        }
    }

    actions = () => {
        const {stepIndex, country_code, phone_number} = this.state;
        const {phoneVerification} = this.props;
        debugger;
        switch (stepIndex) {
            case 0:
                phoneVerification({phone_number, country_code})
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
                        Click here
                        </a> to reset the example.
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
        console.log(this.state);
        console.log(this.props);
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
    // addFlashMessage: PropTypes.func.isRequired,
    // isUserExists: PropTypes.func.isRequired
}

SignupForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default SignupForm;
