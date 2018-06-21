import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ArrowIcon } from '../components/icons';

class Add extends Component {
	componentWillMount() {
		// force users to auth if not logged in
		if (!this.props.isAuthorized) {
			this.props.history.push('/auth');
		}
	}

	componentDidUpdate() {
		// force users to auth if not logged in
		if (!this.props.isAuthorized) {
			this.props.history.push('/auth');
		}
	}

	render() {
		const {
			history: { goBack }
		} = this.props;

		return (
			<div className="add-page">
				<nav>
					<i onClick={goBack} className="back-icon">
						<ArrowIcon />
					</i>
				</nav>
			</div>
		);
	}
}

const mapStateToProps = ({ auth, resources }) => ({
	isAuthorized: auth.isAuthorized,
	tags: resources.tags
});

const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Add);
