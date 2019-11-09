import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SimpleAccordion extends Component {

	componentDidMount() {

		var acc = document.getElementsByClassName("accordion--headline");
		var i;

		for (i = 0; i < acc.length; i++) {
			acc[i].addEventListener("click", function () {

				var panel = this.nextElementSibling;
				if (panel.style.display === "block") {
					panel.style.display = "none";
				} else {
					panel.style.display = "block";
				}
			});
		}

	}

	render() {

		const containerAccordion = {
			transition: "0.4s"
		}

		const accordionHeadline = {
			backgroundColor: "#eee",
			color: "#444",
			cursor: "pointer",
			padding: "20px",
			border: "none",
			textAlign: "left",
			outline: "none",
			fontSize: "15px",
			transition: "1s"
		}

		const accordionPanel = {
			padding: "10px",
			backgroundColor: "white",
			display: "none",
			overflow: "hidden",
			transition: "max-height 0.5s ease-out",
			border: "0.5px solid #000",
			borderTop: "0px solid #000"
		}

		return (
			<div class="container--accordion" style={containerAccordion}>
				<div class="accordion--headline" style={accordionHeadline}>{this.props.headline}</div>
				<div class="accordion--panel" style={accordionPanel}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

SimpleAccordion.propTypes = {
	headline: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired
}

// ####################################################################

class AccordionBox extends Component {
	static propTypes = {
		children: PropTypes.instanceOf(Object).isRequired,
		isOpen: PropTypes.bool.isRequired,
		label: PropTypes.string.isRequired,
		onClick: PropTypes.func.isRequired,
	};

	onClick = () => {
		this.props.onClick(this.props.label);
	};

	render() {
		const {
			onClick,
			props: { isOpen, label },
		} = this;

		return (
			<div
				style={{
					background: isOpen ? '#ccc' : '#ddd',
					border: '0px solid #ccc',
				}}
			>
				<div onClick={onClick} style={{ 
					cursor: 'pointer',
					color: '#fff',
					padding: '5px 10px',
					}}>
					{label}
					<div style={{ float: 'right' }}>
						{!isOpen && <span>&#9650;</span>}
						{isOpen && <span>&#9660;</span>}
					</div>
				</div>
				{isOpen && (
					<div
						style={{
							background: '#fff',
							border: '0px solid #008f68',
							marginTop: 10,
							padding: '5px 10px',
						}}
					>
						{this.props.children}
					</div>
				)}
			</div>
		);
	}
}

// ####################################################################

class DynamicAccordion extends Component {
	static propTypes = {
		allowMultipleOpen: PropTypes.bool,
		children: PropTypes.instanceOf(Object).isRequired,
	};

	constructor(props) {
		super(props);

			const openSections = {};

			this.props.children.forEach(child => {
				if (child.props.isOpen) {
					openSections[child.props.label] = true;
				}
			});

		this.state = { openSections };
	}

	onClick = label => {
		const {
			props: { allowMultipleOpen },
			state: { openSections },
		} = this;

		const isOpen = !!openSections[label];

		if (allowMultipleOpen) {
			this.setState({
				openSections: {
					...openSections,
					[label]: !isOpen
				}
			});
		} else {
			this.setState({
				openSections: {
					[label]: !isOpen
				}
			});
		}
	};

	render() {
		const {
			onClick,
			props: { children },
			state: { openSections },
		} = this;

		return (
			<div style={{ border: '1px solid #ccc' }}>
				{children.map(child => (
					<AccordionBox
						isOpen={!!openSections[child.props.label]}
						label={child.props.label}
						onClick={onClick}
					>
						{child.props.children}
					</AccordionBox>
				))}
			</div>
		);
	}
}

// ####################################################################

export {
	SimpleAccordion,
	DynamicAccordion
}
