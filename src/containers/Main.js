import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { Header, AltNotFound } from '../components';

const StyledMainContainer = styled.div`
    min-height: 100vh;
    position: relative;
`;

const StyledContainer = styled.section`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;
`;

class Main extends Component {
    render() {
        const { match: { url } } = this.props;

        return (
            <StyledMainContainer>
                <Header url={url} />
                <StyledContainer>
                    <Switch>
                        <Redirect exact path={url} to={`${url}/tasks`} />
                        <Route path={`${url}/tasks`} render={() => <h1>TASKS</h1>} />
                        <Route path={`${url}/done`} render={() => <h1>DONE</h1>} />
                        <Route path={`${url}/notes`} render={() => <h1>NOTES</h1>} />
                        <Route path={`${url}/archive`} render={() => <h1>ARCHIVE</h1>} />
                        <Route component={AltNotFound} />
                    </Switch>
                </StyledContainer>
            </StyledMainContainer>
        );
    }
}


export default Main;
