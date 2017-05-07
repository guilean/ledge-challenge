import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import classnames from 'classnames';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {cyan500, cyan600} from 'material-ui/styles/colors';

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

const LastStep = ({header, body, reset, context}) => {
    return (
        <div className="alert alert-success">
            <h4>{header}</h4>
            <p>
                <a href="#" onClick={(event) => {
                        event.preventDefault();
                        context.setState(reset);
                    }}
                >
                {body}
                </a>
            </p>
        </div>
    );
}

module.exports = {
	ResendCode:ResendCode,
    StepperBody:StepperBody,
    LastStep:LastStep,
};
