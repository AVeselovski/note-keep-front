import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/helpers';
import {
    setValidatorEmailError,
    setValidatorConfirmEmailError,
    setValidatorPasswordError,
    setValidatorConfirmPasswordError,
    loginUser,
    registerUser,
} from '../actions/auth';
import { setStatusLoggingIn } from '../actions/ui';
import { errorMessages as errorMsg } from '../utils/messages';
import { AppTitle, AuthForm, NotFoundAlt } from '../components';

class Auth extends Component {
    state = {
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
    };

    componentWillMount() {
        // force users to dashboard if logged in
        if (!!this.props.isAuthorized) {
            this.props.history.push('/dashboard');
        }
    }

    componentDidUpdate() {
        // force users to dashboard if logged in
        if (!!this.props.isAuthorized) {
            this.props.history.push('/dashboard');
        }
    }

    onChangeEmail = event => {
        const email = event.target.value;
        this.setState({ email });
    };
    onChangeConfirmEmail = event => {
        const confirmEmail = event.target.value;
        this.setState({ confirmEmail });
    };
    onChangePassword = event => {
        const password = event.target.value;
        this.setState({ password });
    };
    onChangeConfirmPassword = event => {
        const confirmPassword = event.target.value;
        this.setState({ confirmPassword });
    };

    onLogin = e => {
        e.preventDefault();

        // get input values
        const { email, password } = this.state;
        email.toString().trim();

        // validate
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        // (un)set errors
        this.props.setValidatorEmailError(
            !!emailError ? errorMsg.validEmailError : ''
        );
        this.props.setValidatorPasswordError(
            !!passwordError ? errorMsg.validPasswordError : ''
        );

        // proceed with logging in if no errors
        if (!emailError && !passwordError) {
            const credentials = { email, password };
            const { history } = this.props;
            this.props.setStatusLoggingIn(true);
            this.props.loginUser(credentials, history);
        }
    };

    onRegister = e => {
        e.preventDefault();

        // get input values
        const { email, confirmEmail, password, confirmPassword } = this.state;
        email.toString().trim();

        // validate
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const confirmEmailError = email !== confirmEmail ? true : false;
        const confirmPasswordError =
            password !== confirmPassword ? true : false;

        // (un)set errors
        this.props.setValidatorEmailError(
            !!emailError ? errorMsg.validEmailError : ''
        );
        this.props.setValidatorPasswordError(
            !!passwordError ? errorMsg.validPasswordError : ''
        );
        this.props.setValidatorConfirmEmailError(
            !!confirmEmailError ? errorMsg.confirmEmailError : ''
        );
        this.props.setValidatorConfirmPasswordError(
            !!confirmPasswordError ? errorMsg.confirmPasswordError : ''
        );

        if (
            !emailError &&
            !passwordError &&
            !confirmEmailError &&
            !confirmPasswordError
        ) {
            const credentials = { email, password };
            const { history } = this.props;
            this.props.setStatusLoggingIn(true);
            this.props.registerUser(credentials, history);
        }
    };

    componentWillUnmount() {
        this.setState({
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: '',
            responseError: '',
        });
    }

    render() {
        const { email, confirmEmail, password, confirmPassword } = this.state;
        const {
            isAuthorized,
            statusLoggingIn,
            emailError,
            confirmEmailError,
            passwordError,
            confirmPasswordError,
            match: { url },
        } = this.props;
        const redirect = isAuthorized ? '/dashboard' : `${url}/login`;

        return (
            <div className="auth-page">
                <AppTitle />
                <Switch>
                    <Redirect exact path={url} to={redirect} />
                    <Route
                        path={`${url}/login`}
                        render={() => (
                            <AuthForm
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
                            <AuthForm
                                onChangeEmail={this.onChangeEmail}
                                onChangeConfirmEmail={this.onChangeConfirmEmail}
                                onChangePassword={this.onChangePassword}
                                onChangeConfirmPassword={
                                    this.onChangeConfirmPassword
                                }
                                email={email}
                                confirmEmail={confirmEmail}
                                password={password}
                                confirmPassword={confirmPassword}
                                emailError={emailError}
                                confirmEmailError={confirmEmailError}
                                passwordError={passwordError}
                                confirmPasswordError={confirmPasswordError}
                                statusLoggingIn={statusLoggingIn}
                                onRegister={this.onRegister}
                                isRegistering
                            />
                        )}
                    />
                    <Route component={NotFoundAlt} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = ({ auth, ui }) => ({
    statusLoggingIn: ui.statusLoggingIn,
    isAuthorized: auth.isAuthorized,
    emailError: auth.emailError,
    confirmEmailError: auth.confirmEmailError,
    passwordError: auth.passwordError,
    confirmPasswordError: auth.confirmPasswordError,
});

const mapDispatchToProps = dispatch => ({
    setValidatorEmailError: val => {
        dispatch(setValidatorEmailError(val));
    },
    setValidatorConfirmEmailError: val => {
        dispatch(setValidatorConfirmEmailError(val));
    },
    setValidatorPasswordError: val => {
        dispatch(setValidatorPasswordError(val));
    },
    setValidatorConfirmPasswordError: val => {
        dispatch(setValidatorConfirmPasswordError(val));
    },
    loginUser: (credentials, history) => {
        dispatch(loginUser(credentials, history));
    },
    registerUser: (credentials, history) => {
        dispatch(registerUser(credentials, history));
    },
    setStatusLoggingIn: val => {
        dispatch(setStatusLoggingIn(val));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);
