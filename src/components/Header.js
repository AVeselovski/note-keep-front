import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../actions/auth';
import FaSignOut from 'react-icons/lib/fa/sign-out';
import FaPlus from 'react-icons/lib/fa/plus';


class Header extends Component {
    render() {
        const { url } = this.props;

        return (
            <nav className="header-desktop">
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
                    <span><FaPlus /></span>
                    <span onClick={() => this.props.logoutUser()}><FaSignOut /></span>
                </div>
            </nav>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => { dispatch(logoutUser()) }
    }
}


export default connect(null, mapDispatchToProps)(Header);
