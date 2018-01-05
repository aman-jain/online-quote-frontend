import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './style.scss';


class NavBar extends Component {
    constructor() {
        super();
        this.burgerToggle = this.burgerToggle.bind(this);
    }
    burgerToggle() {
		const linksEl = document.querySelector('.narrowLinks');
        if (linksEl.style.display === 'block') {
			linksEl.style.display = 'none';
		} else {
			linksEl.style.display = 'block';
		}
	}
	render() {
		return (
			<nav>
				<div className="navWide">
					<div className="wideDiv">
                        <Link className={location.pathname === '/'? 'active':''} to={'/'}>Home</Link>
						<Link className={location.pathname === '/quotes'? 'active':''} to={'/quotes'}>Quotes</Link>
                        <Link className={location.pathname === '/news'? 'active':''} to={'/news'}>News</Link>
						
					</div>
				</div>
				<div className="navNarrow">
					<i className="fa fa-bars fa-2x" onClick={this.burgerToggle}></i>
					<div className="narrowLinks">
                        <Link className="active" to={'/'}>Home</Link>
                        <Link className="active" to={'/quotes'}>Quotes</Link>
					</div>
				</div>
			</nav>
		);
	}
};
export default NavBar;
