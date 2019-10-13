import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateTag } from '../utils/helpers';
import { setProcessing } from '../actions/ui';
import {
    setTitle,
    setDescription,
    setPriority,
    setTag,
    setTitleError,
    setTagError,
    saveNote,
} from '../actions/note';
import { AddForm, Loading } from '../components';

class AddContainer extends Component {
    onSave = e => {
        e.preventDefault();

        const {
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
            saveNote(history);
        }
    };

    componentWillUnmount() {
        // this.props.setProcessing(false); // COMPONENT RESET HERE
    }

    render() {
        const {
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

        return (
            <div className="add-container">
                <AddForm
                    processing={processing}
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
    decription: note.description,
    priority: note.priority,
    tag: note.tag,
    titleError: note.validatorErrors.titleError,
    tagError: note.validatorErrors.tagError,
    tags: resources.tags,
});

const mapDispatchToProps = dispatch => ({
    setProcessing: val => dispatch(setProcessing(val)),
    setTitle: val => dispatch(setTitle(val)),
    setDescription: val => dispatch(setDescription(val)),
    setPriority: val => dispatch(setPriority(val)),
    setTag: val => dispatch(setTag(val)),
    setTitleError: val => dispatch(setTitleError(val)),
    setTagError: val => dispatch(setTagError(val)),
    saveNote: val => dispatch(saveNote(val)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddContainer);
