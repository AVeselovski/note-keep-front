import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import theme from '../theme';
import { notificationMessages as notify } from '../utils/messages';
import Loading from './Loading';

const textFieldStyles = {
	rootStyle: {
		marginBottom: theme.spacingSM,
		width: '300px'
	},
	inputStyle: {
		color: theme.darkGrey,
		height: '30px',
		marginTop: '33px'
	},
	floatingLabelStyle: {
		color: theme.grey,
		top: '28px',
		fontSize: theme.fontLG,
		fontWeight: '400'
	},
	underlineStyle: {
		borderColor: theme.grey
	},
	underlineFocusStyle: {
		borderColor: theme.grey,
		transition: 'none'
	},
	errorStyle: {
		color: theme.yellow,
		bottom: '-5px'
	}
};

const AuthForm = ({
	onChangeEmail,
	onChangeConfirmEmail,
	onChangePassword,
	onChangeConfirmPassword,
	email,
	confirmEmail,
	password,
	confirmPassword,
	emailError,
	confirmEmailError,
	passwordError,
	confirmPasswordError,
	statusLoggingIn,
	onLogin,
	onRegister,
	isRegistering = false
}) => {
	const containerHeight = isRegistering ? '348px' : '174px';

	return (
		<form className="register-form" onSubmit={isRegistering ? onRegister : onLogin}>
			{!statusLoggingIn ? (
				<div className="input-container">
					<TextField
						name="email"
						type="email"
						floatingLabelText="Email:"
						floatingLabelFixed
						value={email}
						onChange={onChangeEmail}
						errorText={emailError}
						style={textFieldStyles.rootStyle}
						inputStyle={textFieldStyles.inputStyle}
						floatingLabelStyle={textFieldStyles.floatingLabelStyle}
						underlineStyle={textFieldStyles.underlineStyle}
						underlineFocusStyle={textFieldStyles.underlineFocusStyle}
						errorStyle={textFieldStyles.errorStyle}
					/>
					{isRegistering && (
						<TextField
							name="confirm-email"
							type="email"
							floatingLabelText="Confirm email:"
							floatingLabelFixed
							value={confirmEmail}
							onChange={onChangeConfirmEmail}
							errorText={confirmEmailError}
							style={textFieldStyles.rootStyle}
							inputStyle={textFieldStyles.inputStyle}
							floatingLabelStyle={textFieldStyles.floatingLabelStyle}
							underlineStyle={textFieldStyles.underlineStyle}
							underlineFocusStyle={textFieldStyles.underlineFocusStyle}
							errorStyle={textFieldStyles.errorStyle}
						/>
					)}
					<TextField
						name="password"
						type="password"
						floatingLabelText="Password:"
						floatingLabelFixed
						value={password}
						onChange={onChangePassword}
						errorText={passwordError}
						style={textFieldStyles.rootStyle}
						inputStyle={textFieldStyles.inputStyle}
						floatingLabelStyle={textFieldStyles.floatingLabelStyle}
						underlineStyle={textFieldStyles.underlineStyle}
						underlineFocusStyle={textFieldStyles.underlineFocusStyle}
						errorStyle={textFieldStyles.errorStyle}
					/>
					{isRegistering && (
						<TextField
							name="confirm-password"
							type="password"
							floatingLabelText="Confirm password:"
							floatingLabelFixed
							value={confirmPassword}
							onChange={onChangeConfirmPassword}
							errorText={confirmPasswordError}
							style={textFieldStyles.rootStyle}
							inputStyle={textFieldStyles.inputStyle}
							floatingLabelStyle={textFieldStyles.floatingLabelStyle}
							underlineStyle={textFieldStyles.underlineStyle}
							underlineFocusStyle={textFieldStyles.underlineFocusStyle}
							errorStyle={textFieldStyles.errorStyle}
						/>
					)}
				</div>
			) : (
				<div className="input-container" style={{ height: containerHeight }}>
					<Loading message={isRegistering ? notify.registering : notify.loggingIn} />
				</div>
			)}
			<div className="button-container">
				<Link
					to={isRegistering ? '/auth/login' : '/auth/register'}
					style={statusLoggingIn ? { pointerEvents: 'none' } : {}}>
					<FlatButton
						label={isRegistering ? 'Login' : 'Register'}
						labelStyle={{
							textTransform: 'none',
							color: theme.grey,
							fontWeight: '300',
							fontSize: theme.fontLG
						}}
						style={{
							height: '50px',
							width: '145px',
							border: `1px solid ${theme.grey}`
						}}
						disabled={statusLoggingIn}
						disableTouchRipple
					/>
				</Link>
				<FlatButton
					label={isRegistering ? 'REGISTER' : 'LOGIN'}
					type="submit"
					labelStyle={{
						color: theme.themeColor,
						fontWeight: '300',
						fontSize: theme.fontLG
					}}
					style={{
						height: '50px',
						width: '145px',
						border: `1px solid ${theme.grey}`
					}}
					backgroundColor={theme.grey}
					hoverColor={theme.lightGrey}
					disabled={statusLoggingIn}
					disableTouchRipple
				/>
			</div>
		</form>
	);
};

AuthForm.propTypes = {
	onChangeEmail: PropTypes.func,
	onChangeConfirmEmail: PropTypes.func,
	onChangePassword: PropTypes.func,
	onChangeConfirmPassword: PropTypes.func,
	email: PropTypes.string,
	confirmEmail: PropTypes.string,
	password: PropTypes.string,
	confirmPassword: PropTypes.string,
	emailError: PropTypes.string,
	confirmEmailError: PropTypes.string,
	passwordError: PropTypes.string,
	confirmPasswordError: PropTypes.string,
	statusLoggingIn: PropTypes.bool,
	onLogin: PropTypes.func,
	onRegister: PropTypes.func,
	isRegistering: PropTypes.bool
};

export default AuthForm;
