import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Header, AltNotFound } from '../components';


class Main extends Component {
    componentWillMount() {
        console.log('Allahu will mount');
    }
    componentDidMount() {
        console.log('Allahu did mount');
    }
    componentWillUpdate() {
        console.log('Allahu will mount');
    }
    componentDidUpdate() {
        console.log('Allahu did update');
    }
    render() {
        const { match: { url } } = this.props;

        console.log('Allahu re rendered');

        return (
            <div className="main-page">
                <Header url={url} />
                <div className="main-container" style={!!this.props.menuOpen ? { marginLeft: '240px' } : { marginLeft: '0px' }}>
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

const mapStateToProps = ({ ui }) => ({
    menuOpen: ui.menuOpen
});


export default connect(mapStateToProps)(Main);
