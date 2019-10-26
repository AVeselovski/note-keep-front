import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { filter, propEq, map, comparator, gt, prop, sort, either, when, assoc } from 'ramda';
import { Header, Loading, NotFoundAlt, CardsContainer, Empty, Info } from '../components';
import { logoutUser } from '../actions/auth';
import { toggleMenu } from '../actions/ui';
import {
    fetchCards,
    setActiveTag,
    setTasks,
    setNotes,
    setArchive,
    updateResources,
} from '../actions/resources';
import { changeCardStatus, toggleCardItem, deleteNote } from '../actions/note';
import { setProcessing } from '../actions/ui';
import AddContainer from './AddContainer';

class Main extends Component {
    componentDidMount() {
        // force users to auth if not logged in
        if (!this.props.isAuthorized) {
            this.props.history.push('/auth');
        }

        this.props.setProcessing(true);
        this.props.fetchCards();

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

    // REFACTOR THIS TO USE MEMOIZATION INSTEAD
    componentWillReceiveProps(nextProps) {
        if (nextProps.allCards !== this.props.allCards) {
            this.filterResources(nextProps.allCards, this.props.activeTag);
        }
    }

    filterResources(allCards, tag = null) {
        let data = allCards;

        if (tag && tag !== '#all') {
            data = filter(propEq('tag', tag), allCards);
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

        map(filterCards, data);

        const priorityComparator = comparator((a, b) =>
            gt(prop('priority', a), prop('priority', b))
        );
        const dateComparator = comparator((a, b) => gt(prop('createdBy', a), prop('createdBy', b)));

        const sortedTasks = sort(either(priorityComparator, dateComparator), tasks);

        this.props.setTasks(sortedTasks);
        this.props.setNotes(notes);
        this.props.setArchive(archived);
    }

    filterTag = tag => {
        this.props.setActiveTag(tag);
        this.filterResources(this.props.allCards, tag);
    };

    onCheckItem = (val, itemId, card) => {
        const items = map(when(propEq('_id', itemId), assoc('checked', val)), card.list.items);
        const list = {
            ...card.list,
            items,
        };
        const newCard = {
            ...card,
            list,
        };
        this.props.toggleCardItem(newCard);
        this.props.updateResources(newCard);
    };

    render() {
        const {
            match: { url },
            location: { pathname },
            history,
            version,
            menuOpen,
            processing,
            tags,
            activeTag,
            tasks,
            notes,
            archive,
            toggleMenu,
            logoutUser,
            changeCardStatus,
            deleteNote,
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
                <div className={`main-container${menuOpen ? ' menu-open' : ''}`}>
                    <Switch>
                        <Redirect exact from={url} to={`${url}/tasks`} />
                        <Route
                            path={`${url}/tasks`}
                            render={() =>
                                !!processing ? (
                                    <div className="loading-container">
                                        <Loading alternative />
                                    </div>
                                ) : !tasks.length ? (
                                    <Empty message="ZERO" />
                                ) : (
                                    <CardsContainer
                                        url={url}
                                        data={tasks}
                                        changeStatus={changeCardStatus}
                                        onCheckItem={(val, itemId, card) =>
                                            this.onCheckItem(val, itemId, card)
                                        }
                                    />
                                )
                            }
                        />
                        <Route
                            path={`${url}/notes`}
                            render={() =>
                                !!processing ? (
                                    <div className="loading-container">
                                        <Loading alternative />
                                    </div>
                                ) : !notes.length ? (
                                    <Empty message="ZERO" />
                                ) : (
                                    <CardsContainer
                                        url={url}
                                        data={notes}
                                        changeStatus={changeCardStatus}
                                        onCheckItem={(val, itemId, cardId) =>
                                            this.onCheckItem(val, itemId, cardId)
                                        }
                                    />
                                )
                            }
                        />
                        <Route
                            path={`${url}/archive`}
                            render={() =>
                                !!processing ? (
                                    <div className="loading-container">
                                        <Loading alternative />
                                    </div>
                                ) : !archive.length ? (
                                    <Empty message="ZERO" />
                                ) : (
                                    <CardsContainer
                                        url={url}
                                        data={archive}
                                        checkDisabled={true}
                                        changeStatus={changeCardStatus}
                                        deleteNote={deleteNote}
                                    />
                                )
                            }
                        />
                        <Route
                            path={`${url}/add`}
                            render={() => <AddContainer history={history} />}
                        />
                        <Route
                            path={`${url}/edit/:id`}
                            render={() => <AddContainer history={history} />}
                        />
                        <Route path={`${url}/info`} render={() => <Info />} />
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
    processing: ui.processing,
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    toggleMenu: val => dispatch(toggleMenu(val)),
    setProcessing: val => dispatch(setProcessing(val)),
    fetchCards: () => dispatch(fetchCards()),
    setActiveTag: val => dispatch(setActiveTag(val)),
    setTasks: val => dispatch(setTasks(val)),
    setNotes: val => dispatch(setNotes(val)),
    setArchive: val => dispatch(setArchive(val)),
    updateResources: val => dispatch(updateResources(val)),
    changeCardStatus: val => dispatch(changeCardStatus(val)),
    toggleCardItem: val => dispatch(toggleCardItem(val)),
    deleteNote: val => dispatch(deleteNote(val)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
