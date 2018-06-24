import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddForm } from '../components';

class AddContainer extends Component {
	state = {
		title: '',
		description: ''
	};

	onSubmit = e => {
		e.preventDefault();

		const { title, description } = this.state;
		title.trim();
	};

	render() {
		const { goBack } = this.props;

		return (
			<div className="add-container">
				<AddForm />
			</div>
		);
	}
}

const mapStateToProps = ({ resources }) => ({
	tags: resources.tags
});

const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddContainer);
