import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { logoutUser } from '../actions/auth';
import { toggleMenu } from '../actions/ui';
import { CloseIcon, MenuIcon, PlusIcon } from './icons';


class Header extends Component {
    constructor() {
        super();
        this.state = {
            isMobile: false
        }
        this.updateLayout = this.updateLayout.bind(this);
    }

    componentDidMount() {
        this.updateLayout();
        window.addEventListener("resize", this.updateLayout);
    }

    openSideMenu() {
        this.props.toggleMenu(true);
    }
    closeSideMenu() {
        this.props.toggleMenu(false);
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
        const { url, menuOpen } = this.props;

        return (
            <nav>
                {
                    !this.state.isMobile
                    &&
                    <div className="header-desktop">
                        <ul style={!!menuOpen ? { marginLeft: '240px' } : { marginLeft: '0px' }}>
                            <li className="nav-element">
                                <NavLink to={`${url}/tasks`} activeClassName="active-link">Tasks</NavLink>
                            </li>
                            <li className="nav-element">
                                <NavLink to={`${url}/done`} activeClassName="active-link">Done</NavLink>
                            </li>
                            <li className="nav-element">
                                <NavLink to={`${url}/notes`} activeClassName="active-link">Notes</NavLink>
                            </li>
                        </ul>
                    </div>
                }
                {
                    !this.state.isMobile
                        ?
                        <div className="side-nav" style={!!menuOpen ? { left: '0px' } : { left: '-240px' }}>
                            <div className="side-nav-top">
                                <i
                                    className="btn-close-side-nav"
                                    onClick={() => this.closeSideMenu()}
                                ><CloseIcon /></i>
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
                                <li className="nav-element about">
                                    <NavLink to={`#`} activeClassName="active-link-about">About</NavLink>
                                </li>
                                <li className="nav-element logout" onClick={() => this.props.logoutUser()}>
                                    Logout
                                </li>
                            </ul>
                            <i
                                className="btn-menu"
                                onClick={() => this.openSideMenu()}
                                style={
                                    !!menuOpen
                                        ?
                                        {
                                            left: '265px',
                                            transform: 'rotate(90deg)',
                                            opacity: 0.25,
                                            pointerEvents: 'none',
                                            cursor: 'default'
                                        }
                                        :
                                        { left: '25px' }
                                }
                            ><MenuIcon /></i>
                        </div>
                        :
                        <div className="side-nav-mobile" style={!!menuOpen ? { left: '0px' } : { left: '-100%' }}>
                            <div className="side-nav-top">
                                <i
                                    className="btn-close-side-nav"
                                    onClick={() => this.closeSideMenu()}
                                ><CloseIcon /></i>
                            </div>
                            <ul onClick={() => { this.props.toggleMenu(false) }}>
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
                                <li className="nav-element about">
                                    <NavLink to={`#`} activeClassName="active-link-about">About</NavLink>
                                </li>
                                <li className="nav-element logout" onClick={() => this.props.logoutUser()}>
                                    Logout
                                </li>
                            </ul>
                            <i
                                className="btn-menu"
                                onClick={() => this.openSideMenu()}
                                style={
                                    !!menuOpen
                                        ?
                                        {
                                            left: 'calc(100% + 25px)',
                                            transform: 'rotate(90deg)',
                                            opacity: 0,
                                            pointerEvents: 'none',
                                            cursor: 'default'
                                        }
                                        :
                                        { left: '25px' }
                                }
                            ><MenuIcon /></i>
                        </div>
                }
                <i className="btn-add-new"><PlusIcon /></i>
            </nav>
        );
    }
}

const mapStateToPorps = ({ ui }) => ({
    menuOpen: ui.menuOpen
});

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => { dispatch(logoutUser()) },
        toggleMenu: (val) => { dispatch(toggleMenu(val)) }
    }
}


export default withRouter(connect(mapStateToPorps, mapDispatchToProps)(Header));
