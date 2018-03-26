import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import theme from '../theme';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';


const RegisterForm = ({
    onChangeEmail,
    onChangeConfirmEmail,
    onChangePassword,
    onChangeConfirmPassword,
    email,
    confirmEmail,
    password,
    confirmPassword,
    emailError,
    passwordError,
    statusLoggingIn,
    onRegister
}) => {
    return (
        <form className="register-form" onSubmit={onRegister}>
            {
                !statusLoggingIn
                    ?
                    <div className="input-container">
                        <TextField
                            name="reg-email"
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
                            name="reg-confirm-email"
                            type="email"
                            inputStyle={{ color: theme.darkGrey }}
                            floatingLabelText="Confirm email"
                            floatingLabelFixed
                            floatingLabelStyle={{ color: theme.grey, top: '28px', fontSize: '1.4rem', fontWeight: '400' }}
                            underlineStyle={{ borderColor: theme.grey }}
                            underlineFocusStyle={{ borderColor: theme.grey }}
                            style={{ marginBottom: '15px', width: '300px' }}
                            value={confirmEmail}
                            onChange={onChangeConfirmEmail}
                            errorText=""
                            errorStyle={{ color: theme.yellow }}
                        />
                        <TextField
                            name="reg-password"
                            type="password"
                            inputStyle={{ color: theme.darkGrey }}
                            floatingLabelText="Password"
                            floatingLabelFixed
                            floatingLabelStyle={{ color: theme.grey, top: '28px', fontSize: '1.4rem', fontWeight: '400' }}
                            underlineStyle={{ borderColor: theme.grey }}
                            underlineFocusStyle={{ borderColor: theme.grey }}
                            style={{ marginBottom: '15px', width: '300px' }}
                            value={password}
                            onChange={onChangePassword}
                            errorText={passwordError}
                            errorStyle={{ color: theme.yellow }}
                        />
                        <TextField
                            name="reg-confirm-password"
                            type="password"
                            inputStyle={{ color: theme.darkGrey }}
                            floatingLabelText="Confirm password"
                            floatingLabelFixed
                            floatingLabelStyle={{ color: theme.grey, top: '28px', fontSize: '1.4rem', fontWeight: '400' }}
                            underlineStyle={{ borderColor: theme.grey }}
                            underlineFocusStyle={{ borderColor: theme.grey }}
                            style={{ width: '300px' }}
                            value={confirmPassword}
                            onChange={onChangeConfirmPassword}
                            errorText=""
                            errorStyle={{ color: theme.yellow }}
                        />
                    </div>
                    :
                    <div className="input-container">
                        <CircularProgress size={120} thickness={3} color={theme.grey} />
                    </div>
            }
            <div className="button-container">
                <FlatButton
                    label="REGISTER"
                    type="submit"
                    labelStyle={{ color: theme.themeColor, fontWeight: '300', fontSize: '1.4rem' }}
                    style={{ height: '50px', width: '145px', border: `1px solid ${theme.grey}` }}
                    backgroundColor={theme.grey}
                    hoverColor={theme.lightGrey}
                    disabled={statusLoggingIn}
                />
                <Link to="/auth/login" style={ statusLoggingIn ? { pointerEvents: 'none' } : {}}>
                    <FlatButton
                        label="Login"
                        labelStyle={{ textTransform: 'none', color: theme.grey, fontWeight: '300', fontSize: '1.4rem' }}
                        style={{ height: '50px', width: '145px', border: `1px solid ${theme.grey}` }}
                        disabled={statusLoggingIn}
                    />
                </Link>
            </div>
        </form>
    );
}

RegisterForm.propTypes = {
    onChangeEmail: PropTypes.func,
    onChangeConfirmEmail: PropTypes.func,
    onChangePassword: PropTypes.func,
    onChangeConfirmPassword: PropTypes.func,
    email: PropTypes.string,
    confirmEmail: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    emailError: PropTypes.string,
    passwordError: PropTypes.string,
    statusLoggingIn: PropTypes.bool,
    onRegister: PropTypes.func
};


export default RegisterForm;
