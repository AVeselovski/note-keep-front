import React, { Component } from 'react';
import { connect } from 'react-redux';


class Add extends Component {
    componentWillMount() {
        // force users to auth if not logged in
        if (!this.props.isAuthorized) {
            this.props.history.push('/auth');
        }
    }

    componentDidUpdate() {
        // force users to auth if not logged in
        if (!this.props.isAuthorized) {
            this.props.history.push('/auth');
        }
    }

    render() {
        return (
            <div>
                <h1>Add component</h1>
                
            </div>
        );
    }
}


const mapStateToProps = ({ auth, resources }) => ({
    isAuthorized: auth.isAuthorized,
    tags: resources.tags
});

export default connect(mapStateToProps)(Add);
