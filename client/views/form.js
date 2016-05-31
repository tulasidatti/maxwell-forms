import React, { PropTypes } from 'react';
var Form = React.createClass({
render: function() {
	return (
		<div className="Form">
		i am a form go back to <a href="#">forms</a>
		<div>
		Id: {this.props.params.id}
		</div>
		</div>
	);
	}
});

module.exports = Form;