import React from 'react';
import TextField from 'material-ui/TextField';
import theme from '../theme';
import FlatButton from 'material-ui/FlatButton';

const textFieldStyles = {
    rootStyle: {
        marginBottom: theme.spacingSM,
        // maxWidth: '600px'
    },
    inputStyle: {
        color: theme.darkGrey,
        height: '30px',
        marginTop: '33px'
    },
    textareaStyle: {
        color: theme.darkGrey,
    },
    floatingLabelStyle: {
        color: theme.grey,
        top: '28px',
        fontSize: theme.fontLG,
        fontWeight: '400'
    },
    underlineStyle: {
        borderColor: theme.grey
    },
    underlineFocusStyle: {
        borderColor: theme.grey,
        transition: 'none'
    },
    errorStyle: {
        color: theme.yellow,
        bottom: '-5px'
    }
};

const AddForm = () => {
    return (
        <form className="add-form">
            <TextField
                name="title"
                type="text"
                floatingLabelText="Title:"
                floatingLabelFixed
                fullWidth
                // value={email}
                // onChange={onChangeEmail}
                // errorText={emailError}
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
                // value={email}
                // onChange={onChangeEmail}
                // errorText={emailError}
                style={textFieldStyles.rootStyle}
                textareaStyle={textFieldStyles.textareaStyle}
                floatingLabelStyle={textFieldStyles.floatingLabelStyle}
                underlineStyle={textFieldStyles.underlineStyle}
                underlineFocusStyle={textFieldStyles.underlineFocusStyle}
                errorStyle={textFieldStyles.errorStyle}
            />
        </form>
    );
};

export default AddForm;
