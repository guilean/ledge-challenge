import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/FlatButton';
import styles from '../sass/styles.scss';
// import Context from '../managers/Context';
import * as actions from '../actions/config';
import API from '../domain/API';


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
class Main extends React.Component {

    render() {
        this.props.phone_verification({"phone_number":"4232050478","country_code":"1"});
        return (
                <div className="panel">
                    <RaisedButton className="btn-primary" label="Login" primary={true} />
                    <RaisedButton className="btn-secundary" label="Sign up" primary={false} />
                </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(Main);
