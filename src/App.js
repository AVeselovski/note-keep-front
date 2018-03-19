import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from './theme';

import Auth from './containers/Auth';
import Main from './containers/Main';
import { NotFound } from './components';
import RequireAuth from './components/hoc/RequireAuth';


const StyledApp = styled.div`
  background: ${props => props.theme.themeColor};
  min-height: 100vh;
  color: ${props => props.theme.grey};
`;

class App extends Component {
    render() {
        const redirect = this.props.token ? "dashboard" : "auth";
        return (
            <MuiThemeProvider>
                <ThemeProvider theme={theme}>
                    <StyledApp>
                        <Switch>
                            <Redirect exact from="/" to={redirect} />
                            <Route path="/auth" component={Auth} />
                            <Route path="/dashboard" component={RequireAuth(Main)} />
                            <Route component={NotFound} />
                        </Switch>
                    </StyledApp>
                </ThemeProvider>
            </MuiThemeProvider>
        );
    }
}


export default withRouter(App);
