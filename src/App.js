import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from './theme';

import Auth from './containers/Auth';
import Main from './containers/Main';
import { NotFound } from './components';


const StyledApp = styled.div`
  background: ${props => props.theme.themeColor};
  min-height: 100vh;
  color: ${props => props.theme.grey};
`;

class App extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <MuiThemeProvider>
                <ThemeProvider theme={theme}>
                    <StyledApp>
                        {
                            isLoggedIn
                                ?
                                <Switch>
                                    <Redirect exact path={`/login`} to="/" />
                                    <Route exact path="/" component={Main} />
                                    <Route component={NotFound} />
                                </Switch>
                                :
                                <Auth />
                        }
                    </StyledApp>
                </ThemeProvider>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn
});


export default withRouter(connect(mapStateToProps)(App));
