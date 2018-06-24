import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddForm } from '../components';
import { ArrowIcon } from '../components/icons';

class AddContainer extends Component {
	render() {
		const {
			goBack
		} = this.props;

		return (
			<div className="add-container">
                <AddForm />
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
)(AddContainer);
