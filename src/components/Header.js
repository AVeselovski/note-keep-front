import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../actions/auth';


const StyledHeader = styled.nav`
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;

    ul {
        list-style-type: none;
    }

    .nav-element {
        display: inline-block;

        a {
            text-decoration: none;
            box-sizing: border-box;
            color: ${props => props.theme.darkGrey};
            padding: 5px 30px;
            margin: 0 5px;
            border-bottom: 1px solid ${props => props.theme.darkGrey};
        }
        .active-link {
            color: ${props => props.theme.grey};
            border-bottom: 2px solid ${props => props.theme.grey};
        }
    }
    .nav-left {
        width: 80px;
        margin: 0 30px;
    }
    .nav-right {
        width: 80px;
        margin: 0 30px;
        display: flex;
        justify-content: space-between;
        color: ${props => props.theme.darkGrey};

        span {
            cursor: pointer;
        }
        span:hover {
            color: ${props => props.theme.grey};
        }
    }
`;


class Header extends Component {
    render() {
        const { url } = this.props;

        return (
            <StyledHeader>
                <div className="nav-left"></div>
                <ul>
                    <li className="nav-element">
                        <NavLink to={`${url}/tasks`} activeClassName="active-link">Tasks</NavLink>
                    </li>
                    <li className="nav-element">
                        <NavLink to={`${url}/done`} activeClassName="active-link">Done</NavLink>
                    </li>
                    <li className="nav-element">
                        <NavLink to={`${url}/notes`} activeClassName="active-link">Notes</NavLink>
                    </li>
                    <li className="nav-element">
                        <NavLink to={`${url}/archive`} activeClassName="active-link">Archive</NavLink>
                    </li>
                </ul>
                <div className="nav-right">
                    <span>+</span>
                    <span onClick={() => this.props.logoutUser()}>Logout</span>
                </div>
            </StyledHeader>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => { dispatch(logoutUser()) }
    }
}


export default connect(null, mapDispatchToProps)(Header);
