import React from 'react';
import { Link, browserHistory } from 'react-router'
var ProductList = React.createClass({
	getInitialState: function() {
		return {
			checked: false
		};
	},
	checkIt: function() {
		this.props.callback(this.props.index, !this.props.checked, this.props.productId);
		return;
	},
	render: function() {	
		if(this.props.products){
			return (
				<tr>
					<td>
						<input className="no-margin" name="products" ref="products" value={this.props.obj.id} type="checkbox" checked={this.props.checked} onChange={this.checkIt} />
					</td>
					<td>
						<span className="name">{this.props.obj.productName}</span>
					</td>
				</tr>
			)
		}
		else {	   
			return ( 
			<tr><td> Please choose vendor / No products for the selected vendor</td></tr>
			)
		}	
	}
});

export default ProductList;