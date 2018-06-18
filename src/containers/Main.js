import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Header, Loading, NotFoundAlt, CardContainer, Empty } from '../components';
import { logoutUser } from '../actions/auth';
import { toggleMenu } from '../actions/ui';
import { getCards, setActiveTag } from '../actions/resources';
import { setStatusFetchingResources } from '../actions/ui';

const R = require('ramda');

class Main extends Component {
	state = {
		archived: [],
		tasks: [],
		notes: []
	};

	componentWillMount() {
		// force users to auth if not logged in
		if (!this.props.isAuthorized) {
			this.props.history.push('/auth');
		}
		this.props.setStatusFetchingResources(true);
	}

	componentDidMount() {
		setTimeout(() => {
			this.props.getCards();
			if (this.props.activeTag === '') {
				this.props.setActiveTag('#all');
			}
			this.filterResources(this.props.allCards);
		}, 600);
	}

	componentDidUpdate() {
		// force users to auth if not logged in
		if (!this.props.isAuthorized) {
			this.props.history.push('/auth');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.allCards !== this.props.allCards) {
			this.filterResources(nextProps.allCards);
		}
	}

	filterResources(allCards, tag = null) {
		let data = allCards;

		if (tag && tag !== '#all') {
			data = R.filter(R.propEq('tag', tag), allCards);
		}

		let tasks = [];
		let notes = [];
		let archived = [];

		const filterCards = c => {
			if (c.status === 'archived') {
				archived.push(c);
			} else if (c.priority === 0) {
				notes.push(c);
			} else {
				tasks.push(c);
			}
		};

		R.map(filterCards, data);

		this.setState(prevState => {
			return { archived, tasks, notes };
		});
	}

	filterTag = tag => {
		this.props.setActiveTag(tag);
		this.filterResources(this.props.allCards, tag);
	};

	render() {
		const {
			match: { url },
			location: { pathname },
			history: { goBack },
			menuOpen,
			statusFetchingResources,
			tags,
			activeTag,
			toggleMenu,
			logoutUser
		} = this.props;

		const { archived, tasks, notes } = this.state;

		return (
			<div className="main-page">
				<Header
					url={url}
					pathname={pathname}
					goBack={goBack}
					menuOpen={menuOpen}
					tags={tags}
					activeTag={activeTag}
					logoutUser={logoutUser}
					toggleMenu={toggleMenu}
					filterTag={this.filterTag}
				/>
				<div className={`main-container${menuOpen ? ' menu-open' : ''}`}>
					<Switch>
						<Redirect exact from={url} to={`${url}/tasks`} />
						<Route
							path={`${url}/tasks`}
							render={() =>
								!!statusFetchingResources ? (
									<div className="loading-container">
										<Loading alternative />
									</div>
								) : !tasks.length ? (
									<Empty message="I guess you could say... zero tasks" />
								) : (
									<CardContainer data={tasks} />
								)
							}
						/>
						<Route
							path={`${url}/notes`}
							render={() =>
								!!statusFetchingResources ? (
									<div className="loading-container">
										<Loading alternative />
									</div>
								) : !notes.length ? (
									<Empty message="Looks empty" />
								) : (
									<CardContainer data={notes} />
								)
							}
						/>
						<Route
							path={`${url}/archive`}
							render={() =>
								!!statusFetchingResources ? (
									<div className="loading-container">
										<Loading alternative />
									</div>
								) : !archived.length ? (
									<Empty message="Nothing in archive" />
								) : (
									<CardContainer data={archived} />
								)
							}
						/>
						<Route component={NotFoundAlt} />
					</Switch>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ auth, resources, ui }) => ({
	isAuthorized: auth.isAuthorized,
	allCards: resources.allCards,
	tags: resources.tags,
	activeTag: resources.activeTag,
	menuOpen: ui.menuOpen,
	statusFetchingResources: ui.statusFetchingResources
});

const mapDispatchToProps = dispatch => ({
	logoutUser: () => {
		dispatch(logoutUser());
	},
	toggleMenu: val => {
		dispatch(toggleMenu(val));
	},
	setStatusFetchingResources: val => {
		dispatch(setStatusFetchingResources(val));
	},
	getCards: () => {
		dispatch(getCards());
	},
	setActiveTag: val => {
		dispatch(setActiveTag(val));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);
