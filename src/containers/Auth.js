import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { validateEmail, validatePassword } from '../utils/helpers';
import { validatorEmailError, validatorPasswordError } from '../actions/ui-actions';

import { AppTitle, LoginForm } from '../components';


const StyledAuthPage = styled.section`
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
        font-size: 3.56rem;
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
        
        const { email, password } = this.state;
        const { emailError, passwordError } = this.props;

        email.toString().trim();

        this.props.validatorEmailError(validateEmail(email));
        this.props.validatorPasswordError(validatePassword(password));

        console.log(emailError, passwordError);
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
                    onLogin={this.onLogin}
                />
            </StyledAuthPage>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        validatorEmailError: (email) => { dispatch(validatorEmailError(email)) },
        validatorPasswordError: (password) => { dispatch(validatorPasswordError(password)) }
    }
};

const mapStateToProps = (state) => ({
    loggingIn: state.ui.loggingIn,
    emailError: state.ui.emailError,
    passwordError: state.ui.passwordError
});


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
