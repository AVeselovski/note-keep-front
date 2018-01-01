import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { validateEmail, validatePassword } from '../utils/helpers';
import { setEmailError, setPasswordError, setLoggingIn } from '../actions/ui-actions';

import { AppTitle, LoginForm, RegisterForm, AltNotFound } from '../components';


const StyledAuthPage = styled.section`
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
        font-size: 4.18rem;
        font-weight: 100;
        margin-bottom: 40px;
    }
`;

class Auth extends Component {
    state = {
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    }
    onChangeEmail = (event) => {
        const email = event.target.value;
        this.setState({ email });
    }
    onChangeConfirmEmail = (event) => {
        const confirmEmail = event.target.value;
        this.setState({ confirmEmail });
    }
    onChangePassword = (event) => {
        const password = event.target.value;
        this.setState({ password });
    }
    onChangeConfirmPassword = (event) => {
        const confirmPassword = event.target.value;
        this.setState({ confirmPassword });
    }
    onLogin = (e) => {
        e.preventDefault();

        // get input values
        const { email, password } = this.state;
        email.toString().trim();

        // validate
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        // (un)set errors
        this.props.setEmailError(emailError.msg);
        this.props.setPasswordError(passwordError.msg);

        // proceed with logging in if no errors
        if (emailError.error === false && passwordError.error === false) {
            this.props.setLoggingIn();
        }
    }
    onRegister = (e) => {
        e.preventDefault();
        // WIP
        this.props.setLoggingIn();
    }
    render() {
        const { email, confirmEmail, password, confirmPassword } = this.state;
        const { loggingIn, emailError, passwordError, match: { url } } = this.props;
        console.log(url);
        return (
            <StyledAuthPage>
                <AppTitle />
                <Switch>
                    <Redirect exact path={url} to="/login" />
                    <Route
                        path="/login"
                        render={() => (
                            <LoginForm
                                onChangeEmail={this.onChangeEmail}
                                onChangePassword={this.onChangePassword}
                                email={email}
                                password={password}
                                emailError={emailError}
                                passwordError={passwordError}
                                loggingIn={loggingIn}
                                onLogin={this.onLogin}
                            />
                        )}
                    />
                    <Route
                        path="/register"
                        render={() => (
                            <RegisterForm
                                onChangeEmail={this.onChangeEmail}
                                onChangeConfirmEmail={this.onChangeConfirmEmail}
                                onChangePassword={this.onChangePassword}
                                onChangeConfirmPassword={this.onChangeConfirmPassword}
                                email={email}
                                confirmEmail={confirmEmail}
                                password={password}
                                confirmPassword={confirmPassword}
                                emailError={emailError}
                                passwordError={passwordError}
                                loggingIn={loggingIn}
                                onRegister={this.onRegister}
                            />
                        )}
                    />
                    <Route component={AltNotFound} />
                </Switch>
            </StyledAuthPage>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEmailError: (email) => { dispatch(setEmailError(email)) },
        setPasswordError: (password) => { dispatch(setPasswordError(password)) },
        setLoggingIn: () => { dispatch(setLoggingIn()) }
    }
};

const mapStateToProps = (state) => ({
    loggingIn: state.ui.loggingIn,
    emailError: state.ui.emailError,
    passwordError: state.ui.passwordError
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
