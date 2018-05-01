import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import theme from '../../theme';


class HeaderNav extends Component {
    renderIndicatorLine() {
        const curLocation = this.props.pathname.split('/').pop();
        const position = curLocation === 'tasks'
            ? { left: '0', backgroundColor: theme.red }
            : { left: '110px', backgroundColor: theme.blue };

        if (curLocation === 'tasks' || curLocation === 'notes') {
            return <span className="slider-line" style={position} />;
        }

        return null;
    }

    render() {
        const { menuOpen, url } = this.props;

        return (
            <div className="header-nav">
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
        );
    }
}


HeaderNav.propTypes = {
    menuOpen: PropTypes.bool,
    url: PropTypes.string,
    pathname: PropTypes.string
}

export default HeaderNav;
