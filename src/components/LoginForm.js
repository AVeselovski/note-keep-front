import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../theme';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';


const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const StyledInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 160px;
    justify-content: center;
    align-items: center;
`;

const StyledButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 50px;
`;

const LoginForm = ({
    onChangeEmail,
    onChangePassword,
    email,
    password,
    emailError,
    passwordError,
    statusLoggingIn,
    onLogin
}) => {
    return (
        <StyledForm onSubmit={onLogin}>
            {
                !statusLoggingIn
                    ?
                    <StyledInputContainer>
                        <TextField
                            name="login-email"
                            type="email"
                            inputStyle={{ color: theme.grey }}
                            floatingLabelText="Email"
                            floatingLabelFixed
                            floatingLabelStyle={{ color: theme.grey, top: '28px', fontSize: '1.4rem', fontWeight: '400' }}
                            underlineStyle={{ borderColor: theme.grey }}
                            underlineFocusStyle={{ borderColor: theme.grey }}
                            style={{ marginBottom: '15px', width: '300px' }}
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
                            style={{ width: '300px' }}
                            value={password}
                            onChange={onChangePassword}
                            errorText={passwordError}
                            errorStyle={{ color: theme.yellow }}
                        />
                    </StyledInputContainer>
                    :
                    <StyledInputContainer>
                        <CircularProgress size={120} thickness={3} color={theme.grey} />
                    </StyledInputContainer>
            }
            <StyledButtonContainer>
                <FlatButton
                    label="LOGIN"
                    type="submit"
                    labelStyle={{ color: theme.themeColor, fontWeight: '300', fontSize: '1.4rem' }}
                    style={{ height: '50px', width: '140px', border: `1px solid ${theme.grey}` }}
                    backgroundColor={theme.grey}
                    hoverColor={theme.lightGrey}
                    disabled={statusLoggingIn}
                />
                <Link to="/auth/register" style={ statusLoggingIn ? { pointerEvents: 'none' } : {}}>
                    <FlatButton
                        label="Register"
                        labelStyle={{ textTransform: 'none', color: theme.grey, fontWeight: '300', fontSize: '1.4rem' }}
                        style={{ height: '50px', width: '140px', border: `1px solid ${theme.grey}` }}
                        disabled={statusLoggingIn}
                    />
                </Link>
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
    statusLoggingIn: PropTypes.bool,
    onLogin: PropTypes.func
};


export default LoginForm;
