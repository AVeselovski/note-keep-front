import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Auth from './containers/Auth';
import Main from './containers/Main';
import { NotFound } from './components';


class App extends Component {
    render() {
        const redirect = this.props.token ? "dashboard" : "auth";

        return (
            <MuiThemeProvider>
                <div className="app">
                    <Switch>
                        <Redirect exact from="/" to={redirect} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/dashboard" component={Main} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </MuiThemeProvider>
        );
    }
}


export default withRouter(App);
