import React from 'react';
import FlashMessagesList from '../components/flash/FlashMessagesList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <MuiThemeProvider>
                    <div>
                        <FlashMessagesList />
                        {this.props.children}
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
