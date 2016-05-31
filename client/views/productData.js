import React from 'react';
import { Link, browserHistory } from 'react-router'
import _ from 'lodash';
import ProductList from './productList.js';

var ProductData = React.createClass({
	getInitialState: function() {
		var rowState =[];
		//var rowValues = [];
		for(var i = 0; i < this.props.rows.length; i++) {
			rowState[i] = false;
		}
		return {
			checkAll: false,
			rowState:rowState,
			rowValues:[]
		};
	},
	checkRow: function (id,value, productId) {		
		 var rowValues = this.state.rowValues;
		if(value==true){console.log(true)
			 rowValues.push(productId);
		}
		else
		{			
			rowValues = _.without(rowValues, productId)		
		}
		this.state.rowState[id] = value;
		if (this.state.checkAll) {
			this.state.checkAll = !this.state.checkAll;
		}
		this.setState({
			rowState: this.state.rowState,
			checkAll: this.state.checkAll,
			rowValues: rowValues
		});
		
	},
	checkAll: function () {
		var rowState =[];
		var rowValues =[];

		var checkState = !this.state.checkAll;
		for(var i = 0; i < this.state.rowState.length; i++) {
			rowState[i] = checkState;
		} 

		_.map(this.props.rows, function( row,index) {
			if(checkState ==true) {
				rowValues.push(row.id);
			}
			else
			{
				rowValues = _.without(rowValues, row.id)		
			}
			
		})

		this.state.checkAll = checkState; 
		this.setState({
			rowState: rowState,
			checkAll: this.state.checkAll,
			rowValues: rowValues
		});
	},	
	deleteProducts: function() {
		$.ajax({
		    type    : 'DELETE',
		    url     : '/products/' + this.state.rowValues,
		    success : function(response) {

		       if ( response === 'error' ) {

		           alert('crap!');

		       } else if (response === 'success' ) {

		           alert('Deleted Successfully!');

		       }

		    }
		});
	},
	handleSearch: function()
    {
        var queryResult=[];
		var queryText = this.refs.queryText.value;
        this.props.products.forEach(function(product){
            if(product.productName.toLowerCase().indexOf(queryText)!=-1)
            queryResult.push(product);
        });
        this.props.onSearchUpdate(queryResult);          
    },
	render: function() {
		var self = this;
		var prodcutsLength = this.props.rows.length;
		
		var rows = _.map(this.props.rows, function( row,index) {
			return (<ProductList obj={row} index={index} key={row.id} checked={self.state.rowState[index]} callback={self.checkRow} products={prodcutsLength} productId={row.id}ref="inner"/>);
		});	  
		return (
		 
			<div className="container panel">
				<div className="col-sm-12">
					<section className="panel">
						<div className="panel-body">
							<div className="row todo-action-bar">

								<div className="box1">
									<div className="mainheading">
										<h3>Delta Dental</h3> 
										<h4>Enrollment/Changeform</h4>
									</div>
									<div className="row">
										<div className="col-md-3 firstblk">

										  <div className="form-group">
											   
												<div className="input-group">
													<input type="text" className="form-control" name="InputName" id="InputName" placeholder="Search product button" required ref="queryText" />	{this.props.vendorValue}						
												</div>
											</div> 
										</div>
										<div className="col-md-3 firstrgt">
											<div className="input-group spinner">
												<select className="form-control"><option>Product Type</option></select>
											</div> 
										</div>
										<div className="col-md-6 srchbtn">
											<button type="button" className="btn btn-primary topsrch" onClick={this.handleSearch}>Search</button> &nbsp;&nbsp;
											<button type="button" className="btn btn-primary topsrch" onClick={this.deleteProducts}>Delete</button>
										</div> 
									</div>
									<div className="clearfix"></div>
									<div className="table-responsive">
										<table className="table table-condensed table-striped table-bordered table-hover no-margin">
											<thead>
												<tr>
													<th style={{width: '5%'}} >
														<input className="no-margin" type="checkbox"  checked={this.state.checkAll} onChange={this.checkAll} />
													</th>
													<th>
														Products<p className="assingprod"><a href="#">Assinged Products({this.state.rowValues.length} )</a></p>
													</th>
												</tr>
											</thead>
											<tbody>
												{rows}        
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		);
	}
});
export default ProductData;