import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Header extends Component {
	constructor() {
		super();
		this.state = {
			cityDropdown: false,
			selectedCity: 'New York City',
			citiesData: []
		};
	}

	clickedCityDropdown = () => {
		this.setState({
			cityDropdown: !this.state.cityDropdown
		});
	};

	selectCity = city => {
		this.setState(
			{
				selectedCity: city
			},
			() => {
				let city = this.state.citiesData.filter(item => {
					return item.title == this.state.selectedCity;
				});
				const { match, history } = this.props;
				history.push(`/${city[0].slug}`);
			}
		);
	};

	loopCities = () => {
		const self = this;
		return this.state.citiesData.map((item, index) => {
			return (
				<li key={index} onClick={self.selectCity.bind(null, item.title)}>
					{item.title}
				</li>
			);
		});
	};
	// }
	componentWillMount() {
		const self = this;
		axios
			.get(`/api/cities`)
			.then(function(response) {
				// handle success
				const { match, history } = self.props;
				let city = response.data.filter(item => {
					return item.slug == match.params.city;
				});
				self.setState({
					citiesData: response.data,
					selectedCity: city[0].title
				});
			})
			.catch(function(error) {
				// handle error
				console.log(error);
			})
			.finally(function() {
				// always executed
			});
	}
	render() {
		return (
			<header>
				<div className={'left_menu'}>
					<a href="/" className={'logo'}>
						Craigslist
					</a>
					<div className={'city-dropdown'} onClick={this.clickedCityDropdown}>
						{this.state.selectedCity}
						<i
							className={`fas  ${
								this.state.cityDropdown ? 'fa-chevron-up' : 'fa-chevron-down'
							}`}
						></i>
						<div
							className={`scroll-area ${
								this.state.cityDropdown ? 'active' : ''
							}`}
						>
							<ul>{this.loopCities()}</ul>
						</div>
					</div>
				</div>

				<div className={'right_menu'}>
					<div className={'user_img'}>image</div>
					<div className={'user_dropdown'}>
						my account <i className={`fas fa-chevron-down`}></i>
					</div>
					<div className={'post-btn'}>post to classifieds</div>
				</div>
			</header>
		);
	}
}
