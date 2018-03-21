import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Header, AltNotFound } from '../components';


class Main extends Component {
    render() {
        const { match: { url } } = this.props;

        return (
            <div className="main-page">
                <Header url={url} />
                <div className="main-container">
                    <Switch>
                        <Redirect exact path={url} to={`${url}/tasks`} />
                        <Route path={`${url}/tasks`} render={() => <h1>TASKS</h1>} />
                        <Route path={`${url}/done`} render={() => <h1>DONE</h1>} />
                        <Route path={`${url}/notes`} render={() => <h1>NOTES</h1>} />
                        <Route path={`${url}/archive`} render={() => <h1>ARCHIVE</h1>} />
                        <Route component={AltNotFound} />
                    </Switch>
                </div>
            </div>
        );
    }
}


export default Main;
