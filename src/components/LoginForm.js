import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import theme from '../theme';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';


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
        <form className="login-from" onSubmit={onLogin}>
            {
                !statusLoggingIn
                    ?
                    <div className="input-container">
                        <TextField
                            name="login-email"
                            type="email"
                            inputStyle={{ color: theme.darkGrey }}
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
                            inputStyle={{ color: theme.darkGrey }}
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
                    </div>
                    :
                    <div className="input-container">
                        <CircularProgress size={120} thickness={3} color={theme.grey} />
                    </div>
            }
            <div className="button-container">
                <Link to="/auth/register" style={ statusLoggingIn ? { pointerEvents: 'none' } : {}}>
                    <FlatButton
                        label="Register"
                        labelStyle={{ textTransform: 'none', color: theme.grey, fontWeight: '300', fontSize: '1.4rem' }}
                        style={{ height: '50px', width: '145px', border: `1px solid ${theme.grey}` }}
                        disabled={statusLoggingIn}
                    />
                </Link>
                <FlatButton
                    label="LOGIN"
                    type="submit"
                    labelStyle={{ color: theme.themeColor, fontWeight: '300', fontSize: '1.4rem' }}
                    style={{ height: '50px', width: '145px', border: `1px solid ${theme.grey}` }}
                    backgroundColor={theme.grey}
                    hoverColor={theme.lightGrey}
                    disabled={statusLoggingIn}
                />
            </div>
        </form>
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
