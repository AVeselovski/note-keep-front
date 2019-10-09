import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
    Header,
    Loading,
    NotFoundAlt,
    CardsContainer,
    Empty,
} from '../components';
import { logoutUser } from '../actions/auth';
import { toggleMenu } from '../actions/ui';
import {
    getCards,
    setActiveTag,
    setTasks,
    setNotes,
    setArchive,
} from '../actions/resources';
import { setStatusFetchingResources } from '../actions/ui';
import AddContainer from './AddContainer';

const R = require('ramda');

class Main extends Component {
    // componentWillMount() {}

    componentDidMount() {
        // force users to auth if not logged in
        if (!this.props.isAuthorized) {
            this.props.history.push('/auth');
        }

        this.props.setStatusFetchingResources(true);
        this.props.getCards();

        if (this.props.activeTag === '') {
            this.props.setActiveTag('#all');
        }

        this.filterResources(this.props.allCards);
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

        // const notes = response.notes.sort(function(a, b) {
        // 	return b.priority - a.priority;
        // });

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

        const priorityComparator = R.comparator((a, b) =>
            R.gt(R.prop('priority', a), R.prop('priority', b))
        );
        const dateComparator = R.comparator((a, b) =>
            R.gt(R.prop('createdBy', a), R.prop('createdBy', b))
        );

        const sortedTasks = R.sort(
            R.either(priorityComparator, dateComparator),
            tasks
        );

        this.props.setTasks(sortedTasks);
        this.props.setNotes(notes);
        this.props.setArchive(archived);
    }

    filterTag = tag => {
        this.props.setActiveTag(tag);
        this.filterResources(this.props.allCards, tag);
    };

    render() {
        const {
            match: { url },
            location: { pathname },
            history,
            version,
            menuOpen,
            statusFetchingResources,
            tags,
            activeTag,
            tasks,
            notes,
            archive,
            toggleMenu,
            logoutUser,
        } = this.props;

        return (
            <div className="main-page">
                <Header
                    url={url}
                    pathname={pathname}
                    goBack={history.goBack}
                    version={version}
                    menuOpen={menuOpen}
                    tags={tags}
                    activeTag={activeTag}
                    logoutUser={logoutUser}
                    toggleMenu={toggleMenu}
                    filterTag={this.filterTag}
                />
                <div
                    className={`main-container${menuOpen ? ' menu-open' : ''}`}
                >
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
                                    <Empty message="ZERO" />
                                ) : (
                                    <CardsContainer data={tasks} />
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
                                    <Empty message="ZERO" />
                                ) : (
                                    <CardsContainer data={notes} />
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
                                ) : !archive.length ? (
                                    <Empty message="Archive is empty" />
                                ) : (
                                    <CardsContainer data={archive} />
                                )
                            }
                        />
                        <Route
                            path={`${url}/add`}
                            render={() => <AddContainer history={history} />}
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
    tasks: resources.tasks,
    notes: resources.notes,
    archive: resources.archive,
    version: ui.version,
    menuOpen: ui.menuOpen,
    statusFetchingResources: ui.statusFetchingResources,
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
    },
    setTasks: val => {
        dispatch(setTasks(val));
    },
    setNotes: val => {
        dispatch(setNotes(val));
    },
    setArchive: val => {
        dispatch(setArchive(val));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
