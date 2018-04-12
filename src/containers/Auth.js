import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/helpers';
import {
    setValidatorEmailError,
    setValidatorPasswordError,
    setStatusLoggingIn,
    loginUser
} from '../actions/auth';

import { AppTitle, LoginForm, RegisterForm, AltNotFound } from '../components';


class Auth extends Component {
    state = {
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        responseError: ''
    }

    componentWillMount() {
        // force users to dashboard if logged in
        if (!!this.props.statusAuthorized) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.responseError !== this.props.responseError) {
            this.setState((prevState) => {
                return { responseError: nextProps.responseError };
            });
        }
    }

    componentDidUpdate() {
        // force users to dashboard if logged in
        if (!!this.props.statusAuthorized) {
            this.props.history.push('/dashboard');
        }
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
        this.props.setValidatorEmailError(emailError.msg);
        this.props.setValidatorPasswordError(passwordError.msg);

        // proceed with logging in if no errors
        if (emailError.error === false && passwordError.error === false) {
            const credentials = { email, password };
            const { history } = this.props;
            this.props.setStatusLoggingIn(true);
            this.props.loginUser(credentials, history);
        }
    }

    onRegister = (e) => {
        e.preventDefault();

        // WIP
        this.props.setStatusLoggingIn(true);
    }

    componentWillUnmount() {
        this.setState({
            email: '',
            password: '',
            responseError: ''
        });
    }

    render() {
        const { email, confirmEmail, password, confirmPassword, responseError } = this.state;
        const { statusAuthorized, statusLoggingIn, emailError, passwordError, match: { url } } = this.props;
        const redirect = statusAuthorized ? '/dashboard' : `${url}/login`;

        return (
            <div className="auth-page">
                <AppTitle />
                <Switch>
                    <Redirect exact path={url} to={redirect} />
                    <Route
                        path={`${url}/login`}
                        render={() => (
                            <LoginForm
                                onChangeEmail={this.onChangeEmail}
                                onChangePassword={this.onChangePassword}
                                email={email}
                                password={password}
                                emailError={emailError}
                                passwordError={passwordError}
                                statusLoggingIn={statusLoggingIn}
                                onLogin={this.onLogin}
                            />
                        )}
                    />
                    <Route
                        path={`${url}/register`}
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
                                statusLoggingIn={statusLoggingIn}
                                onRegister={this.onRegister}
                            />
                        )}
                    />
                    <Route component={AltNotFound} />
                </Switch>
                <span className="error-msg">{responseError}</span>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    statusLoggingIn: state.auth.statusLoggingIn,
    statusAuthorized: state.auth.statusAuthorized,
    emailError: state.auth.emailError,
    passwordError: state.auth.passwordError,
    responseError: state.auth.responseError
});

const mapDispatchToProps = (dispatch) => {
    return {
        setValidatorEmailError: (email) => { dispatch(setValidatorEmailError(email)) },
        setValidatorPasswordError: (password) => { dispatch(setValidatorPasswordError(password)) },
        setStatusLoggingIn: (val) => { dispatch(setStatusLoggingIn(val)) },
        loginUser: (credentials, history) => { dispatch(loginUser(credentials, history)) }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
