import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from './includes/Header.js';
import Home from './pages/Home.js';
import Listings from './pages/Listings.js';
import Details from './pages/Details.js';
import Category from './pages/Category.js';

export default class App extends Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return (
			<Router>
				<div>
					<Route path="/:city" component={Header} />
					<Route exact path="/" component={Home} />
					<Route exact path="/:city" component={Home} />
					<Route exact path="/:city/:category/:listings" component={Category} />
					<Route exact path="/:city/:category" component={Category} />
					<Route
						exact
						path="/:city/:category/:listings/:item"
						component={Details}
					/>
				</div>
			</Router>
		);
	}
}
