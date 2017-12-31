import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { validateEmail, validatePassword } from '../utils/helpers';
import { setEmailError, setPasswordError, setLoggingIn } from '../actions/ui-actions';

import { AppTitle, LoginForm } from '../components';


const StyledAuthPage = styled.section`
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
        font-size: 3.6rem;
        font-weight: 100;
        margin-bottom: 40px;
    }
`;

class Auth extends Component {
    state = {
        email: '',
        password: ''
    }
    onChangeEmail = (event) => {
        const email = event.target.value;
        this.setState({ email });
    }
    onChangePassword = (event) => {
        const password = event.target.value;
        this.setState({ password });
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
    render() {
        const { email, password } = this.state;
        const { loggingIn, emailError, passwordError } = this.props;
        return (
            <StyledAuthPage>
                <AppTitle />
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


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
