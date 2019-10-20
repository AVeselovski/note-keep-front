import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import theme from '../theme';
import FlatButton from 'material-ui/FlatButton';
import { ArrowIcon, CloseIcon } from '../components/icons';

const textFieldStyles = {
    rootStyle: {
        marginBottom: theme.spacingMD,
    },
    floatingLabelStyle: {
        color: theme.grey,
        fontWeight: '400',
        top: '28px',
    },
    inputStyle: {
        color: theme.lightGrey,
        fontSize: theme.fontMD,
        fontWeight: '400',
        height: '30px',
        marginTop: '33px',
    },
    textareaStyle: {
        color: theme.lightGrey,
        fontSize: theme.fontMD,
        fontWeight: '400',
    },
    labelStyle: {
        color: theme.lightGrey,
        fontSize: theme.fontMD,
        fontWeight: '400',
    },
    underlineStyle: {
        borderColor: theme.grey,
    },
    underlineFocusStyle: {
        borderColor: theme.grey,
        transition: 'none',
    },
    errorStyle: {
        color: theme.yellow,
        bottom: '-5px',
    },
};

const ListItem = ({
    index,
    item,
    focusOn,
    onChangeListItem,
    onRemoveListItem,
}) => {
    return (
        <div className="list-item">
            <TextField
                id={'item-' + index}
                name="item"
                type="text"
                fullWidth
                placeholder="+ List item"
                value={item.name}
                autoFocus={index === focusOn}
                onChange={e => onChangeListItem(e.target.value, index)}
                style={textFieldStyles.rootStyle}
                inputStyle={{
                    color: theme.lightGrey,
                    fontSize: theme.fontMD,
                    fontWeight: '400',
                }}
                underlineStyle={textFieldStyles.underlineStyle}
                underlineFocusStyle={textFieldStyles.underlineFocusStyle}
            />
            <button
                className="list-item__remove-item-btn"
                type="button"
                onClick={() => onRemoveListItem(index)}
            >
                <CloseIcon small />
            </button>
        </div>
    );
};

const AddForm = ({
    paramId,
    processing,
    deleteConfirmed,
    title,
    titleError,
    description,
    list,
    focusOn,
    tag,
    tagError,
    priority,
    onChangeTitle,
    onChangeDescription,
    onChangeTag,
    onChangePriority,
    onChangeListItem,
    onRemoveListItem,
    onAddListItem,
    onSave,
    onDelete,
}) => {
    return (
        <form className="add-form" autoComplete="off" onSubmit={onSave}>
            <TextField
                name="title"
                type="text"
                floatingLabelText="Title:"
                floatingLabelFixed
                fullWidth
                value={title}
                onChange={onChangeTitle}
                errorText={titleError}
                style={textFieldStyles.rootStyle}
                inputStyle={textFieldStyles.inputStyle}
                floatingLabelStyle={textFieldStyles.floatingLabelStyle}
                underlineStyle={textFieldStyles.underlineStyle}
                underlineFocusStyle={textFieldStyles.underlineFocusStyle}
                errorStyle={textFieldStyles.errorStyle}
            />
            <TextField
                name="description"
                type="text"
                floatingLabelText="Description:"
                floatingLabelFixed
                fullWidth
                multiLine
                rows={5}
                value={description}
                onChange={onChangeDescription}
                style={textFieldStyles.rootStyle}
                textareaStyle={textFieldStyles.textareaStyle}
                floatingLabelStyle={textFieldStyles.floatingLabelStyle}
                underlineStyle={textFieldStyles.underlineStyle}
                underlineFocusStyle={textFieldStyles.underlineFocusStyle}
                errorStyle={textFieldStyles.errorStyle}
            />
            <div className="add-form__list-container">
                {list &&
                    list.items.map((item, index) => (
                        <ListItem
                            key={index}
                            index={index}
                            item={item}
                            focusOn={focusOn}
                            onChangeListItem={onChangeListItem}
                            onRemoveListItem={onRemoveListItem}
                        />
                    ))}
                <div key="fad" className="list-item">
                    <button
                        type="button"
                        className="list-item__add-item-btn"
                        onClick={onAddListItem}
                    >
                        + List item
                    </button>
                </div>
            </div>
            <TextField
                name="tag"
                type="text"
                floatingLabelText="Project / category #tag:"
                floatingLabelFixed
                fullWidth
                value={tag}
                onChange={onChangeTag}
                errorText={tagError}
                style={textFieldStyles.rootStyle}
                inputStyle={textFieldStyles.inputStyle}
                floatingLabelStyle={textFieldStyles.floatingLabelStyle}
                underlineStyle={textFieldStyles.underlineStyle}
                underlineFocusStyle={textFieldStyles.underlineFocusStyle}
                errorStyle={textFieldStyles.errorStyle}
            />
            <SelectField
                floatingLabelText="Priority"
                floatingLabelFixed
                fullWidth
                value={priority}
                onChange={onChangePriority}
                style={textFieldStyles.rootStyle}
                labelStyle={textFieldStyles.labelStyle}
                floatingLabelStyle={textFieldStyles.floatingLabelStyle}
                dropDownMenuProps={{
                    iconButton: <ArrowIcon small />,
                }}
                iconStyle={{
                    fill: 'none',
                    height: '32px',
                    padding: '0px',
                    stroke: theme.grey,
                    transform: 'rotate(180deg)',
                    top: '17px',
                    width: '32px',
                }}
                underlineStyle={textFieldStyles.underlineStyle}
                underlineFocusStyle={textFieldStyles.underlineFocusStyle}
                errorStyle={textFieldStyles.errorStyle}
            >
                <MenuItem value={3} primaryText="Task: Priority - Red" />
                <MenuItem value={2} primaryText="Task: Priority - Yellow" />
                <MenuItem value={1} primaryText="Task: Priority - Green" />
                <MenuItem value={0} primaryText="Note" />
            </SelectField>
            {!paramId && (
                <div className="add-form__button-container add-form__button-container--add">
                    <FlatButton
                        label="Add"
                        type="submit"
                        backgroundColor={theme.lightGrey}
                        hoverColor={theme.lightestGrey}
                        labelStyle={{
                            color: processing ? theme.grey : theme.themeColor,
                            fontWeight: '400',
                            fontSize: theme.fontLG,
                            textTransform: 'none',
                        }}
                        style={{
                            height: '50px',
                            opacity: processing ? 0.75 : 1,
                            width: '100%',
                        }}
                        disabled={processing}
                        disableTouchRipple
                    />
                </div>
            )}
            {paramId && (
                <div className="add-form__button-container add-form__button-container--edit">
                    <FlatButton
                        label={!deleteConfirmed ? 'Delete' : 'Sure?'}
                        onClick={onDelete}
                        backgroundColor={theme.red}
                        hoverColor={theme.darkerRed}
                        labelStyle={{
                            color: processing
                                ? theme.lightGrey
                                : theme.lightestGrey,
                            fontWeight: '400',
                            fontSize: theme.fontLG,
                            textTransform: 'none',
                        }}
                        style={{
                            height: '50px',
                            marginRight: theme.spacingXXS,
                            opacity: processing ? 0.75 : 1,
                            width: '100%',
                        }}
                        disabled={processing}
                        disableTouchRipple
                    />
                    <FlatButton
                        label="Save"
                        type="submit"
                        backgroundColor={theme.lightGrey}
                        hoverColor={theme.lightestGrey}
                        labelStyle={{
                            color: processing ? theme.grey : theme.themeColor,
                            fontWeight: '400',
                            fontSize: theme.fontLG,
                            textTransform: 'none',
                        }}
                        style={{
                            height: '50px',
                            marginLeft: theme.spacingXXS,
                            opacity: processing ? 0.75 : 1,
                            width: '100%',
                        }}
                        disabled={processing}
                        disableTouchRipple
                    />
                </div>
            )}
        </form>
    );
};

export default AddForm;
