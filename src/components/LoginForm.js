import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../theme';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const StyledButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 50px;
`;

const LoginForm = ({ onChangeEmail, onChangePassword, email, password, emailError, passwordError, onLogin }) => {
    return (
        <StyledForm onSubmit={onLogin}>
            <TextField
                name="login-email"
                type="email"
                inputStyle={{ color: theme.grey }}
                floatingLabelText="Email"
                floatingLabelFixed
                floatingLabelStyle={{ color: theme.grey, top: '28px', fontSize: '1.4rem', fontWeight: '400' }}
                underlineStyle={{ borderColor: theme.grey }}
                underlineFocusStyle={{ borderColor: theme.grey }}
                style={{ marginBottom: '15px' }}
                value={email}
                onChange={onChangeEmail}
                errorText={emailError}
                errorStyle={{ color: theme.yellow }}
            />
            <TextField
                name="login-password"
                type="password"
                inputStyle={{ color: theme.grey }}
                floatingLabelText="Password"
                floatingLabelFixed
                floatingLabelStyle={{ color: theme.grey, top: '28px', fontSize: '1.4rem', fontWeight: '400' }}
                underlineStyle={{ borderColor: theme.grey }}
                underlineFocusStyle={{ borderColor: theme.grey }}
                value={password}
                onChange={onChangePassword}
                errorText={passwordError}
                errorStyle={{ color: theme.yellow }}
            />
            <StyledButtonContainer>
                <FlatButton
                    label="LOGIN"
                    type="submit"
                    labelStyle={{ color: theme.themeColor, fontWeight: '300', fontSize: '1.4rem' }}
                    style={{ height: '50px', width: '120px', border: `1px solid ${theme.grey}` }}
                    backgroundColor={theme.grey}
                    hoverColor={theme.lightGrey}
                />
                <FlatButton
                    label="Register"
                    labelStyle={{ textTransform: 'none', color: theme.grey, fontWeight: '300', fontSize: '1.4rem' }}
                    style={{ height: '50px', width: '120px', border: `1px solid ${theme.grey}` }}
                />
            </StyledButtonContainer>
        </StyledForm>
    );
}

LoginForm.propTypes = {
    onChangeEmail: PropTypes.func,
    onChangePassword: PropTypes.func,
    email: PropTypes.string,
    password: PropTypes.string,
    emailError: PropTypes.string,
    passwordError: PropTypes.string,
    onLogin: PropTypes.func
};


export default LoginForm;
