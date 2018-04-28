import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import theme from '../theme';


const ErrorNotification = ({ errorMessage, resetNotificationError }) => {
    return (
        <Snackbar
            open={!!errorMessage}
            message={errorMessage}
            autoHideDuration={4000}
            onRequestClose={resetNotificationError}
            style={{
                width: '300px'
            }}
            bodyStyle={{
                backgroundColor: theme.themeColor,
                width: '300px',
                minWidth: '200px',
                borderTop: '1px solid',
                borderRight: '1px solid',
                borderLeft: '1px solid',
                borderColor: theme.red
            }}
            contentStyle={{
                color: theme.red
            }}
        />
    );
}


ErrorNotification.propTypes = {
    errorMessage: PropTypes.string,
    resetNotificationError: PropTypes.func
}

export default ErrorNotification;
