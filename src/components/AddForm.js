import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import theme from '../theme';
import FlatButton from 'material-ui/FlatButton';

const textFieldStyles = {
    rootStyle: {
        marginBottom: theme.spacingSM,
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

const AddForm = ({
    title,
    titleError,
    description,
    priority,
    onChangeTitle,
    onChangeDescription,
    onChangePriority,
    onSave,
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
                rows={3}
                value={description}
                onChange={onChangeDescription}
                style={textFieldStyles.rootStyle}
                textareaStyle={textFieldStyles.textareaStyle}
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
                underlineStyle={textFieldStyles.underlineStyle}
                underlineFocusStyle={textFieldStyles.underlineFocusStyle}
                errorStyle={textFieldStyles.errorStyle}
            >
                <MenuItem value={3} primaryText="Task: Priority - Red" />
                <MenuItem value={2} primaryText="Task: Priority - Yellow" />
                <MenuItem value={1} primaryText="Task: Priority - Green" />
                <MenuItem value={0} primaryText="Note" />
            </SelectField>
            <div className="button-container">
                <FlatButton
                    label="Add"
                    type="submit"
                    backgroundColor={theme.lightGrey}
                    hoverColor={theme.lightestGrey}
                    labelStyle={{
                        color: theme.themeColor,
                        fontWeight: '400',
                        fontSize: theme.fontLG,
                        textTransform: 'none',
                    }}
                    style={{
                        height: '50px',
                        width: '100%',
                    }}
                    // disabled={statusLoggingIn}
                    disableTouchRipple
                />
            </div>
        </form>
    );
};

export default AddForm;
