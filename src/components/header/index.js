import React, { Component } from 'react';
import HeaderNav from './HeaderNav';
import SideNav from './SideNav';
import Tags from './Tags';
import Title from '../Title';

class Header extends Component {
	constructor() {
		super();
		this.state = {
			isMobile: false
		};
		this.updateLayout = this.updateLayout.bind(this);
	}

	componentDidMount() {
		this.updateLayout();
		window.addEventListener('resize', this.updateLayout);
	}

	openSideMenu() {
		this.props.toggleMenu(true);
	}
	closeSideMenu() {
		this.props.toggleMenu(false);
	}

	updateLayout() {
		if (window.innerWidth < 768) {
			this.setState(prevState => {
				return { isMobile: true };
			});
		} else {
			this.setState(prevState => {
				return { isMobile: false };
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateLayout);
	}

	render() {
		const {
			url,
			pathname,
			goBack,
			version,
			menuOpen,
			tags,
			activeTag,
			toggleMenu,
			logoutUser,
			filterTag
		} = this.props;

		const title = pathname
			.split('/')
			.pop()
			.toUpperCase();

		return (
			<nav>
				{this.state.isMobile && <Title title={title} />}
				{!this.state.isMobile && (
					<HeaderNav menuOpen={menuOpen} url={url} pathname={pathname} goBack={goBack} />
				)}
				<SideNav
					isMobile={this.state.isMobile}
					version={version}
					menuOpen={menuOpen}
					url={url}
					pathname={pathname}
					toggleMenu={toggleMenu}
					logoutUser={logoutUser}
				/>
				{tags.length > 1 && <Tags tags={tags} activeTag={activeTag} filterTag={filterTag} />}
			</nav>
		);
	}
}

export default Header;
