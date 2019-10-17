import React, { Component } from 'react';
import { connect } from 'react-redux';
// import memoize from 'memoize-one';
import { withRouter } from 'react-router-dom';
import { validateTag } from '../utils/helpers';
import { setProcessing } from '../actions/ui';
import {
    reset,
    setTitle,
    setDescription,
    setPriority,
    setTag,
    setTitleError,
    setTagError,
    fetchNote,
    saveNote,
    deleteNote,
} from '../actions/note';
import { AddForm, Loading } from '../components';

class AddContainer extends Component {
    state = {
        deleteConfirmed: false,
    };

    onSave = e => {
        e.preventDefault();

        const {
            match: { params },
            history,
            title,
            tag,
            setProcessing,
            setTitleError,
            setTagError,
            saveNote,
        } = this.props;

        const titleError = !title ? 'Title is required.' : '';
        const tagError = validateTag(tag) ? 'No crazy special characters.' : '';

        setTitleError(titleError);
        setTagError(tagError);

        if (!titleError && !tagError) {
            setProcessing(true);
            saveNote({ history, id: params.id ? params.id : null });
        }
    };

    onDelete = () => {
        const {
            match: { params },
            history,
            setProcessing,
            deleteNote,
        } = this.props;

        if (this.state.deleteConfirmed) {
            setProcessing(true);
            deleteNote({ id: params.id, goBack: history.goBack });
        } else {
            this.setState({ deleteConfirmed: true });
        }
    };

    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.fetchNote(this.props.match.params.id);
        }
    }

    // findNote = memoize((list, id) => find(propEq('_id', id))(list)); TEMP

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            match: { params },
            processing,
            title,
            titleError,
            description,
            tag,
            tagError,
            priority,
            setTitle,
            setDescription,
            setTag,
            setPriority,
        } = this.props;

        // const noteInEdit = this.findNote(allCards, params.id); TEMP

        return (
            <div className="add-container">
                <AddForm
                    paramId={params.id}
                    processing={processing}
                    deleteConfirmed={this.state.deleteConfirmed}
                    title={title}
                    titleError={titleError}
                    description={description}
                    tag={tag}
                    tagError={tagError}
                    priority={priority}
                    onChangeTitle={e => setTitle(e.target.value)}
                    onChangeDescription={e => setDescription(e.target.value)}
                    onChangeTag={e => setTag(e.target.value)}
                    onChangePriority={(e, i, val) => setPriority(val)}
                    onSave={this.onSave}
                    onDelete={this.onDelete}
                />
                {processing ? (
                    <div className="loading-overlay">
                        <Loading alternative />
                    </div>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = ({ ui, note, resources }) => ({
    processing: ui.processing,
    title: note.title,
    description: note.description,
    priority: note.priority,
    tag: note.tag,
    titleError: note.validatorErrors.titleError,
    tagError: note.validatorErrors.tagError,
    tags: resources.tags,
});

const mapDispatchToProps = dispatch => ({
    setProcessing: val => dispatch(setProcessing(val)),
    reset: val => dispatch(reset()),
    setTitle: val => dispatch(setTitle(val)),
    setDescription: val => dispatch(setDescription(val)),
    setPriority: val => dispatch(setPriority(val)),
    setTag: val => dispatch(setTag(val)),
    setTitleError: val => dispatch(setTitleError(val)),
    setTagError: val => dispatch(setTagError(val)),
    fetchNote: val => dispatch(fetchNote(val)),
    saveNote: val => dispatch(saveNote(val)),
    deleteNote: val => dispatch(deleteNote(val)),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddContainer)
);
