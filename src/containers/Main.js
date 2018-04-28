import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Header, AltNotFound } from '../components';


class Main extends Component {
    componentWillMount() {
        // force users to dashboard if logged in
        if (!this.props.statusAuthorized) {
            this.props.history.push('/auth');
        }
    }

    componentDidUpdate() {
        // force users to dashboard if logged in
        if (!this.props.statusAuthorized) {
            this.props.history.push('/auth');
        }
    }

    render() {
        const { match: { url } } = this.props;

        return (
            <div className="main-page">
                <Header url={url} />
                <div className="main-container">
                    <Switch>
                        <Redirect exact from={url} to={`${url}/tasks`} />
                        <Route path={`${url}/tasks`} render={() => <h1>TASKS</h1>} />
                        <Route path={`${url}/notes`} render={() => <h1>NOTES</h1>} />
                        <Route path={`${url}/archive`} render={() => <h1>ARCHIVE</h1>} />
                        <Route component={AltNotFound} />
                    </Switch>
                </div>
            </div>
        );
    }
}


const mapStateToProps = ({ auth }) => ({
    statusAuthorized: auth.statusAuthorized
});

export default connect(mapStateToProps)(Main);
