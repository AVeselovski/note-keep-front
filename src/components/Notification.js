import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dismissNotification } from '../actions/ui';
import { CloseIcon } from './icons';
import theme from '../theme';

class Notification extends Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.notificationMsg !== '') {
			setTimeout(() => {
				this.props.dismiss();
			}, this.props.duration || 2000);
		}
	}

	render() {
		const { notificationMsg, notificationType, dismiss } = this.props;
		const type = notificationType || 'error';

		return (
			<div className={`notification${notificationMsg ? ' active' : ''}`}>
				<div
					className="notification-inner"
					style={{
						color: type === 'error' ? theme.red : theme.green
					}}>
					<span>{notificationMsg}</span>
					<i
						className="btn-close"
						onClick={dismiss}
						style={{
							stroke: type === 'error' ? theme.red : theme.green
						}}>
						<CloseIcon size="15" />
					</i>
				</div>
			</div>
		);
	}
}

Notification.propTypes = {
	notificationMsg: PropTypes.string,
	notificationType: PropTypes.string,
	dismiss: PropTypes.func,
	duration: PropTypes.number
};

const mapStateToProps = ({ ui }) => ({
	notificationMsg: ui.notificationMsg,
	notificationType: ui.notificationType
});

const mapDispatchToProps = dispatch => ({
	dismiss: () => {
		dispatch(dismissNotification());
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Notification);
