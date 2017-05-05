import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

class Main extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <FlatButton label="Hey" onClick={() => console.log('hola')}/>
            </MuiThemeProvider>
        );
    }
}

export default Main;
