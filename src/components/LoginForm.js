import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../theme';
import TextField from 'material-ui/TextField';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const LoginForm = ({ onChangeEmail, onChangePassword, email, password }) => {
    return (
        <StyledForm>
            <TextField
                name="login-email"
                type="email"
                inputStyle={{ color: theme.grey }}
                floatingLabelText="Email"
                floatingLabelFixed
                floatingLabelStyle={{ color: theme.grey }}
                underlineStyle={{ borderColor: theme.grey }}
                underlineFocusStyle={{ borderColor: theme.grey }}
                value={email}
                onChange={onChangeEmail}
            />
            <TextField
                name="login-password"
                type="password"
                inputStyle={{ color: theme.grey }}
                floatingLabelText="Password"
                floatingLabelFixed
                floatingLabelStyle={{ color: theme.grey }}
                underlineStyle={{ borderColor: theme.grey }}
                underlineFocusStyle={{ borderColor: theme.grey }}
                onChange={onChangePassword}
                value={password}
            />
        </StyledForm>
    );
}

LoginForm.propTypes = {
    onChangeEmail: PropTypes.func,
    onChangePassword: PropTypes.func,
    email: PropTypes.string,
    password: PropTypes.string
};

export default LoginForm;
