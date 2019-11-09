import React from 'react';
import logo from './logo.svg';
import './App.css';

import { SimpleAccordion, DynamicAccordion } from './components/accordion';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
			</header>
			<section className="content">
        <h2>Simple Accordion</h2>
        <SimpleAccordion
          headline="Welcome"
        >
          <div>Welcome, Stranger</div>
        </SimpleAccordion>
        <hr></hr>
        <h2>Dynamic Accordion with only one open</h2>
				<DynamicAccordion>
					<div label='Welcome'>
						<p><strong>Welcome:</strong> Stranger</p>
					</div>
					<div label='About Us'>
						<p>All about us</p>
					</div>
				</DynamicAccordion>
        <hr></hr>
        <h2>Dynamic Accordion with allow multiple open</h2>
				<DynamicAccordion allowMultipleOpen>
					<div label='Welcome' isOpen>
						<p><strong>Welcome:</strong> Stranger</p>
					</div>
					<div label='About Us'>
						<p>All about us</p>
					</div>
				</DynamicAccordion>
			</section>
			<footer className="App-footer">
				(c) Copyright - Mike Ludemann
			</footer>
		</div>
	);
}

export default App;
