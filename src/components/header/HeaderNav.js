import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import theme from '../../theme';
import { ArrowIcon } from '../icons';

class HeaderNav extends Component {
    renderIndicatorLine(onDisplay, curLocation) {
        const position =
            curLocation === 'tasks'
                ? { left: '0', backgroundColor: theme.red }
                : { left: '110px', backgroundColor: theme.blue };

        if (!!onDisplay) {
            return <span className="indicator-line" style={position} />;
        }

        return null;
    }

    render() {
        const { menuOpen, url, pathname, goBack } = this.props;
        const curLocation = pathname.split('/').pop();
        const onDisplay = curLocation === 'tasks' || curLocation === 'notes';

        return (
            <div className="header-nav">
                <ul
                    className={`${!onDisplay ? 'dimmed ' : ''} ${
                        menuOpen ? 'open' : 'closed'
                    }`}
                >
                    <li className="nav-element">
                        <NavLink
                            to={`${url}/tasks`}
                            activeClassName="active-link"
                        >
                            Tasks
                        </NavLink>
                    </li>
                    <li className="nav-element">
                        <NavLink
                            to={`${url}/notes`}
                            activeClassName="active-link"
                        >
                            Notes
                        </NavLink>
                    </li>
                    {this.renderIndicatorLine(onDisplay, curLocation)}
                </ul>
                {!onDisplay && (
                    <button onClick={goBack} className="back-icon">
                        <ArrowIcon />
                    </button>
                )}
            </div>
        );
    }
}

HeaderNav.propTypes = {
    menuOpen: PropTypes.bool,
    url: PropTypes.string,
    pathname: PropTypes.string,
};

export default HeaderNav;
