import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'


export default function(ComposedComponent) {
    class RequireAuth extends Component {
        componentWillMount() {
            if (!this.props.isAuthorized) {
                this.props.history.push('/auth');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthorized) {
                this.props.history.push('/auth');
            }
        }
        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    const mapStateToProps = (state) => {
        return { isAuthorized: state.auth.isAuthorized };
    }

    return withRouter(connect(mapStateToProps)(RequireAuth));
}
