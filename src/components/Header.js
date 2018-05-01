import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../actions/auth';
import { toggleMenu } from '../actions/ui';
import HeaderNav from './header-components/HeaderNav';
import SideNav from './header-components/SideNav';


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
        const { match: { url }, location: { pathname }, menuOpen } = this.props;

        return (
            <nav>
                {
                    !this.state.isMobile &&
                    <HeaderNav menuOpen={menuOpen} url={url} pathname={pathname} />
                }
                <SideNav
                    isMobile={this.state.isMobile}
                    menuOpen={menuOpen}
                    url={url}
                    toggleMenu={this.props.toggleMenu}
                    logoutUser={this.props.logoutUser}
                />
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
