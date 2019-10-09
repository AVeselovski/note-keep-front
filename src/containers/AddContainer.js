import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    setTitle,
    setDescription,
    setPriority,
    setTag,
    setTitleError,
    saveNote,
} from '../actions/note';
import { AddForm } from '../components';

class AddContainer extends Component {
    onSave = e => {
        e.preventDefault();

        const { history, title, setTitleError, saveNote } = this.props;

        const titleError = !title ? 'Title is required.' : '';

        setTitleError(titleError);

        !titleError && saveNote(history);
    };

    render() {
        const {
            title,
            titleError,
            description,
            priority,
            setTitle,
            setDescription,
            setPriority,
        } = this.props;

        return (
            <div className="add-container">
                <AddForm
                    title={title}
                    titleError={titleError}
                    description={description}
                    priority={priority}
                    onChangeTitle={e => setTitle(e.target.value)}
                    onChangeDescription={e => setDescription(e.target.value)}
                    onChangePriority={(e, i, val) => setPriority(val)}
                    onSave={this.onSave}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ note, resources }) => ({
    title: note.title,
    decription: note.description,
    priority: note.priority,
    tag: note.tag,
    titleError: note.validatorErrors.titleError,
    tags: resources.tags,
});

const mapDispatchToProps = dispatch => ({
    setTitle: val => dispatch(setTitle(val)),
    setDescription: val => dispatch(setDescription(val)),
    setPriority: val => dispatch(setPriority(val)),
    setTag: val => dispatch(setTag(val)),
    setTitleError: val => dispatch(setTitleError(val)),
    saveNote: val => dispatch(saveNote(val)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddContainer);
