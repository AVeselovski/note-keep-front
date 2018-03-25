import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../actions/auth';
import FaSignOut from 'react-icons/lib/fa/sign-out';
import FaPlus from 'react-icons/lib/fa/plus';
import FaBars from 'react-icons/lib/fa/bars';
import { CloseIcon, MenuIcon } from './icons';


class Header extends Component {
    constructor() {
        super();
        this.state = {
            isMobile: false,
            menuOpen: false
        }
        this.updateLayout = this.updateLayout.bind(this);
    }

    componentDidMount() {
        this.updateLayout();
        window.addEventListener("resize", this.updateLayout);
    }

    openSideMenu() {
        this.setState((prevState) => {
            return { menuOpen: true };
        });
    }
    closeSideMenu() {
        this.setState((prevState) => {
            return { menuOpen: false };
        });
    }

    updateLayout() {
        if (window.innerWidth < 768) {
            this.setState((prevState) => {
                return { isMobile: true };
            });
        } else {
            this.setState((prevState) => {
                return { isMobile: false };
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateLayout);
    }

    render() {
        const { url } = this.props;

        return (
            <nav>
                {
                    !this.state.isMobile
                    &&
                    <div className="header-desktop">
                        <div className="nav-left"></div>
                        <ul style={!!this.state.menuOpen ? { marginLeft: '175px' } : { marginLeft: '0px' }}>
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
                    </div>
                }
                <div className="side-nav" style={!!this.state.menuOpen ? { left: '0px' } : { left: '-240px' }}>
                    <div className="side-nav-top">
                        <i className="btn-close-side-nav" onClick={() => this.closeSideMenu()}><CloseIcon /></i>
                    </div>
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
                        <li className="nav-element logout" onClick={() => this.props.logoutUser()}>
                            Logout
                        </li>
                    </ul>
                </div>
                <i
                    className="btn-menu"
                    onClick={() => this.openSideMenu()}
                    style={
                        !!this.state.menuOpen
                            ?
                            {
                                left: '265px',
                                transform: 'rotate(90deg)',
                                opacity: 0.25,
                                clickEvents: 'none',
                                cursor: 'default'
                            }
                            :
                            { left: '25px' }
                    }
                ><MenuIcon /></i>
                <i className="btn-add-new"><CloseIcon size="26" /></i>
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
