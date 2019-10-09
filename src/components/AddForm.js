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
    inputStyle: {
        color: theme.grey,
        fontWeight: '400',
        height: '30px',
        marginTop: '33px',
    },
    textareaStyle: {
        color: theme.grey,
        fontWeight: '400',
    },
    labelStyle: {
        color: theme.grey,
    },
    floatingLabelStyle: {
        color: theme.darkGrey,
        top: '28px',
        fontSize: theme.fontMD,
        fontWeight: '500',
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
                    label="ADD"
                    type="submit"
                    labelStyle={{
                        color: theme.themeColor,
                        fontWeight: '300',
                        fontSize: theme.fontLG,
                    }}
                    style={{
                        height: '50px',
                        width: '145px',
                        border: `1px solid ${theme.grey}`,
                    }}
                    backgroundColor={theme.grey}
                    hoverColor={theme.lightGrey}
                    // disabled={statusLoggingIn}
                    disableTouchRipple
                />
            </div>
        </form>
    );
};

export default AddForm;
