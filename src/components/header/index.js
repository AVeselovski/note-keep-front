import React, { Component } from 'react';
import HeaderNav from './HeaderNav';
import SideNav from './SideNav';
import Tags from './Tags';
import Select from './Select';


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
        const {
            url,
            pathname,
            menuOpen,
            tags,
            activeTag,
            toggleMenu,
            logoutUser,
            filterTag
        } = this.props;

        return (
            <nav>
                {
                    !this.state.isMobile &&
                    <HeaderNav menuOpen={menuOpen} url={url} pathname={pathname} />
                }
                <Select tags={tags} />
                <SideNav
                    isMobile={this.state.isMobile}
                    menuOpen={menuOpen}
                    url={url}
                    toggleMenu={toggleMenu}
                    logoutUser={logoutUser}
                />
                {
                    tags.length > 1 && 
                    <Tags tags={tags} activeTag={activeTag} filterTag={filterTag} />
                }
            </nav>
        );
    }
}

export default Header;
