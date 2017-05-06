import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Main from './containers/Main';
// import SignupPage from './components/signup/SignupPage';
// import LoginPage from './components/login/LoginPage';
// import NewEventPage from './components/events/NewEventPage';

// import requireAuth from './utils/requireAuth';
// <Route path="signup" component={SignupPage} />
// <Route path="login" component={LoginPage} />
// <Route path="new-event" component={requireAuth(NewEventPage)} />
export default (
    <Route path="/" component={App}>
        <IndexRoute component={Main} />
    </Route>
)
