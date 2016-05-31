import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Header from '../components/header';


const App = (props) => {
	return (
		<div>
			<Header />
			<div>

			{props.children}
			</div>
		</div>
	);
};

App.propTypes = {
	children: PropTypes.element
};

export default App;