import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			categoriesData: ''
		};
	}

	componentWillMount() {}

	componentDidMount() {
		const { match, history } = this.props;
		if (match.params.city == undefined) {
			history.push('/sf');
		}
		const self = this;
		axios
			.get(`/api/${match.params.city}`)
			.then(function(response) {
				//handle sucess
				self.setState(
					{
						categoriesData: response.data
					},
					() => {
						console.log(self.state.categoriesData);
					}
				);
			})
			.catch(function(error) {
				// handle error
				console.log(error);
			})
			.finally(function() {
				// always executed
			});
	}
	loopCategories = () => {
		if (this.state.categoriesData != '') {
			return this.state.categoriesData.map((category, i) => {
				const loopListings = () => {
					return category.listings.map((listing, index) => {
						return (
							<a
								href={`${this.props.match.params.city}/${category.title}/${listing.slug}`}
								className={'link'}
								key={index}
							>
								{listing.name}
							</a>
						);
					});
				};
				return (
					<div className="categories" key={i}>
						<a
							href={`/${this.props.match.params.city}/${category.title}`}
							className="title"
						>
							{category.title}
						</a>
						<div
							className={`group-links ${
								category.title == 'jobs' || category.title == 'housing'
									? 'single-col'
									: ''
							}`}
						>
							{loopListings()}
						</div>
					</div>
				);
			});
		}
	};
	loopTags = () => {
		let testTags = [1, 2, 3, 4, 5, 6, 7];
		return testTags.map((item, i) => {
			return (
				<div className={'tag'} key={i}>
					Apple MacBook
				</div>
			);
		});
	};
	render() {
		return (
			<div className="home">
				<div className="container">
					<h1>
						Connecting People <br /> Every Where :)
					</h1>
					<h5>for testing purpose hit for-sale :- cars & trucks!!</h5>

					<section className={'links'}>{this.loopCategories()}</section>

					<section className={'trending'}>
						<input type="text" name="" className="search" />
						<div className="title">
							<i className="far fa-clock"></i> Trending Now
						</div>
						<div className={'trending-tags'}>{this.loopTags()}</div>
					</section>
				</div>
			</div>
		);
	}
}
