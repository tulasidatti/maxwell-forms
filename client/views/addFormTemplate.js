// To Implement the Tabs feature we inlcuded react-bootstrap
import React from 'react';
import { browserHistory } from 'react-router'
import { Tabs, Tab } from 'react-bootstrap';
import FormInfo from './formInfo.js';
import ProductData from './productData.js';
import Comments from './comments.js';

const Forms = React.createClass({
	getInitialState() {
		var products = [
		{
			'id' : 1,
			'productName': 'Dental Pediatric Dental Upside Holdings'
		},
		{
			'id' : 2,
			'productName': 'Dental PPO Prediatric 60 SQOR'
		},
		{
			'id' : 3,
			'productName': 'Enhanced Dental HMO Pediatric for Small Bussiness $20'
		}
	];
		return {
			key: 1,
			msg: this.props.params.msg,
			vendorValue: '',
			products: products,
			rows: products
		};
	},

	handleSelect(key) {		
		this.setState({key});		
		this.setState({msg: ''});		
		
	},
	onVendorUpdate: function(val){
      this.setState({
          vendorValue: val
      });
  	},
  	onSearchUpdate: function(prods){
      this.setState({      	
          rows: prods
      });
  	},
	render() { 
		return (
			 <div className="container">
				<h1>Add New Form Template</h1>

				<Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
					<Tab className="formInfoTab" eventKey={1} title="Form Info">
					<FormInfo msg={this.state.msg} onVendorUpdate={this.onVendorUpdate}/>
					</Tab>
					<Tab className="ProductsTab" eventKey={2} title="Products"><ProductData rows={this.state.rows} vendorValue={this.state.vendorValue} onSearchUpdate={this.onSearchUpdate} products={this.state.products}/></Tab>					
					<Tab className="EmployersTab"eventKey={3} title="Employers"><Comments url={'http://localhost:8888/forms'} perPage={10}/></Tab>
				</Tabs>



			</div>
		);
	}
});

export default Forms;