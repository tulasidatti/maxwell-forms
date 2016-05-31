import React from 'react';
import ReactPaginate from 'react-paginate';
import MyComponentList from './myComponentList.js';


var Comments = React.createClass({
	loadObjectsFromServer: function() {
		$.ajax({
			 url      : this.props.url,
			dataType: 'json',
			data: {limit: this.props.perPage, offset: this.state.offset},
			success: function(data) {
				this.setState({data: data.comments, pageNum: (data.meta.total_count / data.meta.limit)});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	handleClick: function(data) {
		var selected = data.selected;
		this.setState({offset: Math.ceil((selected) * this.props.perPage)}, function(){
       		this.loadObjectsFromServer();
    	}.bind(this));        
	},
	getInitialState: function() {
		return {data: [], offset: 0};
	},
	componentDidMount: function() {
		this.loadObjectsFromServer();
	},
	render: function() { 
		return (
			<div className="my-component">
				<MyComponentList data={this.state.data} />

				<nav id="project-pagination">
			   		<ReactPaginate  clickCallback={this.handleClick}
					   previousLabel={"previous"}
					   nextLabel={"next"}
					   breakLabel={<a href="">...</a>}
					   pageNum={this.state.pageNum}
					   marginPagesDisplayed={2}
					   pageRangeDisplayed={5}					  
					   containerClassName={"pagination"}
					   subContainerClassName={"pages pagination"}
					   activeClassName={"active"} />
				</nav>
			</div>
		);
	}
});

export default Comments;