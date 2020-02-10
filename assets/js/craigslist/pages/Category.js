import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import qs from 'query-string';
import { Link } from 'react-router-dom';

export default class Category extends Component {
	constructor() {
		super();
		this.state = {
			min_price: 0,
			max_price: 10000,
			sort: 'newest',
			select_view: 'gallery',
			make: 'ford',
			model: 'focus'
		};
	}

	componentWillMount() {
		console.log(this.state);
		const { match, history } = this.props;
		console.log(match.params.category);
		const self = this;
		console.log(self.state.make);

		const queryParams = qs.parse(this.props.location.search);
		const {
			min_price,
			max_price,
			sort,
			select_view,
			make,
			model
		} = queryParams;
		if (queryParams.min_price != undefined) {
			axios
				.get(
					`/api/${match.params.city}/${match.params.category}?min_price=${min_price}&max_price=${max_price}&sort=${sort}&select_view=${select_view}&make=${make}&model=${model}`
				)
				.then(function(response) {
					self.setState(
						{
							itemsData: response.data
						},
						() => {
							console.log(self.state);
						}
					);
				})
				.catch(function(error) {
					console.log(error);
				});
		} else {
			axios
				.get(`/api/${match.params.city}/${match.params.category}`)
				.then(function(response) {
					self.setState(
						{
							itemsData: response.data
						},
						() => {
							console.log(self.state);
						}
					);
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	}
// ---------------------------------------
// 	looping through categories
// ---------------------------------------	
	loopItems = () => {
		const { match, history } = this.props;
		if (this.state.itemsData != undefined) {
			return this.state.itemsData.map((item, i) => {
				return (
					<div className="item" key={i}>
						<Link to={`${item.listing}/${item.title}`}>
							<div
								className="image"
								style={{
									backgroundImage: `url('${item.images[0]}')`
								}}
							>
								<div className="price">${item.price}</div>
							</div>
							<div className="details">
								<h5>
									{item.title}
									<i className="far fa-star"></i>
								</h5>
								<h6>{item.city}</h6>
							</div>
						</Link>
					</div>
				);
			});
		}
	};
// ----------------------------------------
// filtering 
// ------------------------------------------
	showMakeModelDropdown = () => {
		const { match, location, history } = this.props;

		if (match.params.listings == 'cars-and-trucks') {
			return (
				<div className="make-model-comp">
					<div className="form-group make">
						<label>Make</label>
						<select
							name="make"
							className="make"
							onChange={this.handleChange}
							value={this.state.make}
						>
							<option value="BMW">BMW</option>
							<option value="Audi">Audi</option>
							<option value="Bugati">Bugati</option>
							<option value="Tesla">Tesla</option>
							<option value="Rolce Royce">Rolce Royce</option>
							<option value="Bently">Bently</option>
							<option value="Range Rover">Range Rover</option>
							<option value="Lamborghini">Lamborghini</option>
						</select>
					</div>
					<div className="form-group model">
						<label>Model</label>
						<select
							name="model"
							className="model"
							onChange={this.handleChange}
							value={this.state.model}
						>
							<option value="Series 7">Series 7</option>
							<option value="R8">R8</option>
							<option value="Chiron">Chiron</option>
							<option value="Model T">Model T</option>
							<option value="Phantom">Phantom</option>
							<option value="Mulsane">Mulsane</option>
							<option value="Velar">Velar</option>
							<option value="Chiron">Chiron</option>
						</select>
					</div>
				</div>
			);
		}
	};

	handleChange = event => {
		const name = event.target.name;
		const value =
			event.target.type == 'checkbox'
				? event.target.checked
				: event.target.value;

		this.setState(
			{
				[name]: value
			},
			() => {
				console.log(this.state);
			}
		);
	};

	submitFilters = () => {
		const self = this;
		const { match, location, history } = this.props;
		const { min_price, max_price, sort, select_view, make, model } = this.state;

		document.location.href = `/${match.params.city}/${match.params.category}/${match.params.listings}?min_price=${min_price}&max_price=${max_price}&sort=${sort}&select_view=${select_view}&make=${make}&model=${model}`;

		const queryParams = qs.parse(this.props.location.search);
	};

	render() {
		const { match, location, history } = this.props;

		return (
			<div className="listings-page">
				<div className="container">
					<section id="filter">
						<div className="form-group price">
							<label>Price</label>
							<div className="min-max">
								<select
									name="min_price"
									className="min-price"
									onChange={this.handleChange}
									value={this.state.min_price}
								>
									<option value="0">0</option>
									<option value="10000">10000</option>
									<option value="50000">50000</option>
								</select>
								<select
									name="max_price"
									className="max-price"
									onChange={this.handleChange}
									value={this.state.max_price}
								>
									<option value="100000">100000</option>
									<option value="1000000">1000000</option>
								</select>
							</div>
						</div>
						{this.showMakeModelDropdown()}
						<div className="form-group button">
							<div className="primary-btn" onClick={this.submitFilters}>
								Update
							</div>
							<div className="reset-btn">Reset</div>
						</div>
					</section>
				</div>
				<section id="list-view">
					<div className="container">
						<div className="white-box">
							<section className="change-view">
								<div className="form-group view-dropdown">
									<select
										name="select_view"
										className="select-view"
										onChange={this.handleChange}
										value={this.state.select_view}
									>
										<option value="gallery">Gallery view</option>
										<option value="list">List view</option>
										<option value="thumb">Thumb view</option>
									</select>
								</div>
								<div className="form-group sort-dropdown">
									<select
										name="sort"
										className="sort-dropdown"
										onChange={this.handleChange}
										value={this.state.sort}
									>
										<option value="newest">Newest</option>
										<option value="oldest">Oldest</option>
									</select>
								</div>
							</section>
							<section className="all-items">
								{console.log(match.params)}
								{this.loopItems()}
							</section>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
