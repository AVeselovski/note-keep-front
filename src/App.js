import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Auth from './containers/Auth';
import Main from './containers/Main';
import { NotFound } from './components';
import RequireAuth from './components/hoc/RequireAuth';


class App extends Component {
    componentWillMount() {
        console.log('Allahu App will mount');
    }
    componentDidMount() {
        console.log('Allahu App did mount');
    }
    componentWillUpdate() {
        console.log('Allahu App will mount');
    }
    componentDidUpdate() {
        console.log('Allahu App did update');
    }
    render() {
        const redirect = this.props.token ? "dashboard" : "auth";

        console.log('Allahu App re rendered');
        return (
            <MuiThemeProvider>
                <div className="app">
                    <Switch>
                        <Redirect exact from="/" to={redirect} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/dashboard" component={RequireAuth(Main)} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </MuiThemeProvider>
        );
    }
}


export default withRouter(App);
