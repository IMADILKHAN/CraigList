import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Gallery extends Component {
	constructor() {
		super();
		this.state = {
			allImgs: ' ',
			currentImg: '',
			currentIndex: 0
		};
	}
	componentWillMount() {
		const allImgs = [
			'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
			'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
			'https://images.unsplash.com/photo-1563969105207-420a5d2794de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
			'https://images.unsplash.com/photo-1533239752861-f51f83282979?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
			' https://images.unsplash.com/photo-1566338774647-14068acb0b82?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
			'https://images.unsplash.com/photo-1497491988912-efbdb3e09747?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
			'https://images.unsplash.com/photo-1549064233-e0345fce1f19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
		];

		this.setState({
			allImgs
			// currentImg: allImgs[this.state.currentIndex]
		});
	}
	allImgsLoop = () => {
		return this.state.allImgs.map((item, i) => {
			return (
				<div
					className="thumb-img"
					key={i}
					onClick={this.clickedThumb.bind(null, i)}
					style={{
						backgroundImage: `url('${item}')`
					}}
				></div>
			);
		});
	};

	nextBtn = () => {
		if (this.state.currentIndex != this.state.allImgs.length - 1) {
			this.setState({
				currentIndex: this.state.currentIndex + 1
			});
		}
	};
	prevBtn = () => {
		if (this.state.currentIndex != 0) {
			this.setState({
				currentIndex: this.state.currentIndex - 1
			});
		}
	};

	clickedThumb = i => {
		this.setState({
			currentIndex: i
		});
	};
	render() {
		return (
			<div className="gallery">
				<div className="slider">
					<div className="main-image">
						<div className=" arrows left-arrow" onClick={this.prevBtn}>
							<i className="fas fa-chevron-left"></i>
						</div>
						<div className=" arrows right-arrow" onClick={this.nextBtn}>
							<i className="fas fa-chevron-right"></i>
						</div>
						<div
							className="image-1"
							style={{
								backgroundImage: `url('${
									this.state.allImgs[this.state.currentIndex]
								}')`
							}}
						>
							{' '}
						</div>
					</div>
				</div>

				<div className="thumbnails">{this.allImgsLoop()}</div>
			</div>
		);
	}
}
