import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { AppTitle, LoginForm } from '../components';

const StyledAuthPage = styled.section`
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
        font-size: 3.6rem;
        font-weight: 100;
        margin-bottom: 50px;
    }
`;

class Auth extends Component {
    state = {
        email: '',
        password: ''
    }
    onChangeEmail = (event) => {
        const email = event.target.value;
        this.setState({ email });
    }
    onChangePassword = (event) => {
        const password = event.target.value;
        this.setState({ password });
    }
    render() {
        const { email, password } = this.props;
        return (
            <StyledAuthPage>
                <AppTitle />
                <LoginForm
                    onChangeEmail={this.onChangeEmail}
                    onChangePassword={this.pnChangePassword}
                    email={email}
                    password={password}
                />
            </StyledAuthPage>
        );
    }
}

const mapStateToProps = (state) => {
    const { email, password } = state.auth;
    return {
        email, password
    };
}

export default connect(mapStateToProps)(Auth);
