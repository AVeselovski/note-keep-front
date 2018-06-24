import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { CloseIcon, MenuIcon, PlusIcon } from '../icons';

const SideNav = ({ isMobile = false, version, menuOpen, url, toggleMenu, logoutUser }) => {
    return (
        <div className={`side-nav${menuOpen ? ' open' : ''}`}>
            <span className="version">{version}</span>
            <div className="side-nav-top">
                <i className="btn-close-side-nav" onClick={() => toggleMenu(false)}>
                    <CloseIcon />
                </i>
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
                    <NavLink to={`${url}/archive`} activeClassName="active-link">
                        Archive
					</NavLink>
                </li>
                <li className="nav-element">
                    <NavLink to={`#`} activeClassName="active-link">
                        About
					</NavLink>
                </li>
                <li className="nav-element logout" onClick={logoutUser}>
                    Logout
				</li>
            </ul>
            <i className={`btn-menu${menuOpen ? ' open' : ''}`} onClick={() => toggleMenu(true)}>
                <MenuIcon />
            </i>
            <NavLink
                to={`${url}/add`}
                className="btn-add-new"
                onClick={isMobile ? () => toggleMenu(false) : null}>
                <PlusIcon />
            </NavLink>
        </div>
    );
};

SideNav.propTypes = {
    version: PropTypes.string,
    isMobile: PropTypes.bool,
    menuOpen: PropTypes.bool,
    url: PropTypes.string,
    toggleMenu: PropTypes.func,
    logoutUser: PropTypes.func
};

export default SideNav;
