import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { logoutUser } from '../actions/auth';
import { toggleMenu } from '../actions/ui';
import { CloseIcon, MenuIcon, PlusIcon } from './icons';
import theme from '../theme';


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

    renderIndicatorLine() {
        const curLocation = this.props.location.pathname.split('/').pop();
        // const position = { left: curLocation === 'tasks' ? '0' : '110px' }
        const position = curLocation === 'tasks'
            ? { left: '0', backgroundColor: theme.red }
            : { left: '110px', backgroundColor: theme.blue };

        if (curLocation === 'tasks' || curLocation === 'notes') {
            return <span className="slider-line" style={position} />;
        }

        return null;
    }

    render() {
        const { url, menuOpen } = this.props;
        console.log(this.props.location.pathname);

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
                                <NavLink to={`${url}/notes`} activeClassName="active-link">Notes</NavLink>
                            </li>
                            {this.renderIndicatorLine()}
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
                                    <NavLink to={`${url}/notes`} activeClassName="active-link">Notes</NavLink>
                                </li>
                                <li className="nav-element">
                                    <NavLink to={`${url}/archive`} activeClassName="active-link">Archive</NavLink>
                                </li>
                                <li className="nav-element">
                                    <NavLink to={`#`} activeClassName="active-link">About</NavLink>
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
                                    <NavLink to={`${url}/notes`} activeClassName="active-link">Notes</NavLink>
                                </li>
                                <li className="nav-element">
                                    <NavLink to={`${url}/archive`} activeClassName="active-link">Archive</NavLink>
                                </li>
                                <li className="nav-element">
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
