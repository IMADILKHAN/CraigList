import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Gallery from './components/Gallery.js';
export default class Details extends Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		const { match, location, history } = this.props;
		return (
			<div className="details-page">
				<div className="container">
					<div className="white-box">
						<section className="submenu">
							<div className="direction">
								<a href="#" className="prev">
									Prev
								</a>
								<a href="#" className="next">
									Next
								</a>
							</div>
							<nav className="sub-links">
								<a href="#">More Ads By User</a>
								<a href="#">Print</a>
								<a href="#">Share</a>
								<a href="#">Contact Seller</a>
							</nav>
						</section>

						<section className="content-area">
							<div className="media-column">
								<Gallery />
							</div>
							<div className="details-column">
								<div className="date">Posted: Feb 28th</div>
								<h3 className="title">BMW 7 Series</h3>
								<h4 className="price">$89,450.</h4>

								<div className="more-details">
									<div className="info">
										<label>Vin</label>
										<h5>WRISNO48925XJSIDJ</h5>
									</div>
									<div className="info">
										<label>Mileage</label>
										<h5>34255</h5>
									</div>
									<div className="info">
										<label>Transmission</label>
										<h5>Automatic</h5>
									</div>
									<div className="info">
										<label>Fuel</label>
										<h5>Petrol</h5>
									</div>
									<div className="info">
										<label>Drive</label>
										<h5>Rear Wheel Drive</h5>
									</div>
									<div className="info">
										<label>Type</label>
										<h5>Sedan</h5>
									</div>
								</div>
								<div className="description">
									<label className="desc-label">Description</label>
									<p>
										The BMW 7 Series is a full-size luxury sedan produced by the
										German automaker BMW since 1977. It is the successor to the
										BMW E3 "New Six" sedan and is currently in its sixth
										generation.
									</p>{' '}
									<p>
										The 7 Series is BMW's flagship car and is only available in
										a saloon bodystyle (including long wheelbase and limousine
										models). It traditionally introduces technologies and
										exterior design themes before they trickle down to other
										models in BMW's lineup.[1]
									</p>
									<p>
										The BMW 7 Series is a full-size luxury sedan produced by the
										German automaker BMW since 1977. It is the successor to the
										BMW E3 "New Six" sedan and is currently in its sixth
										generation.
									</p>
									<p>
										The BMW 7 Series is a full-size luxury sedan produced by the
										German automaker BMW since 1977. It is the successor to the
										BMW E3 "New Six" sedan and is currently in its sixth
										generation.
									</p>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		);
	}
}
