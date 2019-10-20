import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { CloseIcon, MenuIcon, PlusIcon } from '../icons';

const SideNav = ({
    isMobile = false,
    version,
    menuOpen,
    url,
    pathname,
    toggleMenu,
    logoutUser,
}) => {
    const curLocation = pathname.split('/')[2];

    return (
        <div className={`side-nav${menuOpen ? ' open' : ''}`}>
            <span className="version">{version}</span>
            <div className="side-nav-top">
                <button
                    className="btn-close-side-nav"
                    onClick={() => toggleMenu(false)}
                >
                    <CloseIcon />
                </button>
            </div>
            <ul onClick={isMobile ? () => toggleMenu(false) : null}>
                <li className="nav-element">
                    <NavLink to={`${url}/tasks`} activeClassName="active-link">
                        Tasks
                    </NavLink>
                </li>
                <li className="nav-element">
                    <NavLink to={`${url}/notes`} activeClassName="active-link">
                        Notes
                    </NavLink>
                </li>
                <li className="nav-element">
                    <NavLink
                        to={`${url}/archive`}
                        activeClassName="active-link"
                    >
                        Archive
                    </NavLink>
                </li>
                <li className="nav-element">
                    <NavLink to={`${url}/info`} activeClassName="active-link">
                        Info
                    </NavLink>
                </li>
                <li className="nav-element logout" onClick={logoutUser}>
                    Logout
                </li>
            </ul>
            <button
                className={`btn-menu${menuOpen ? ' open' : ''}`}
                onClick={() => toggleMenu(true)}
            >
                <MenuIcon />
            </button>
            {curLocation !== 'add' && curLocation !== 'edit' && (
                <button className="btn-add-new">
                    <NavLink
                        to={`${url}/add`}
                        onClick={isMobile ? () => toggleMenu(false) : null}
                    >
                        <PlusIcon />
                    </NavLink>
                </button>
            )}
        </div>
    );
};

SideNav.propTypes = {
    version: PropTypes.string,
    isMobile: PropTypes.bool,
    menuOpen: PropTypes.bool,
    url: PropTypes.string,
    pathname: PropTypes.string,
    toggleMenu: PropTypes.func,
    logoutUser: PropTypes.func,
};

export default SideNav;
