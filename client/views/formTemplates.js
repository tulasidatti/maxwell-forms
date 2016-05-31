import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { InputGroup, Button, Row, Col, Grid } from 'react-bootstrap';
import StateControl from './state'
import VendorControl from './vendor'

import TokenInput from 'react-tokeninput'
var ComboboxOption = require('react-tokeninput').Option

var _ = require('lodash');
var without = require('lodash/without')
var uniq = require('lodash/uniq')
var names = require('./names')


var Carousel = require('react-responsive-carousel').Carousel;
var Slider = require('react-slick');

var DatePicker = require('react-datepicker');
var moment = require('moment');

require('react-datepicker/dist/react-datepicker.css');
require('react-responsive-carousel/styles/carousel.css');

import ReactPaginate from 'react-paginate';
import MyComponentList from './myComponentList.js';

//require("css!./react-datepicker/dist/react-datepicker.css");

const FormTemplates = React.createClass({
 
	getInitialState() {
		return {
			key: 1,
		  input: '',
      loading: false,
      selected: [],
      options: names,
      startDate: moment(),
      formdata:[],
      offset: 0
		};
	},

	handleSelect(key) {		
		this.setState({key});		
	},

	contextTypes: {
		router: React.PropTypes.object.isRequired    	
	},

	navigate(event) {
		event.preventDefault() 
		this.context.router.push('/addFormTemplate')  			
	},
	 handleChange: function(value) {
    this.setState({
      selected: value
    })
  },

  handleRemove: function(value) {
    var selectedOptions = uniq(without(this.state.selected,value))
    this.handleChange(selectedOptions)
  },

  handleSelected: function(value, combobox) {
    if(typeof value === 'string') {
      value = {id: value, name: value};
    }

    var selected = uniq(this.state.selected.concat([value]))
    this.setState({
      selected: selected,
      selectedToken: null
    })

    this.handleChange(selected)
  },

  handleInput: function(userInput) {
    this.setState({
      input: userInput,
      loading: true,
      options: []
    })
    setTimeout(function () {
      this.filterTags(this.state.input)
      this.setState({
        loading: false
      })
    }.bind(this), 500)
  },

  filterTags: function(userInput) {
    if (userInput === '')
      return this.setState({options: []});
    var filter = new RegExp('^'+userInput, 'i');
    var filteredNames = names.filter(function(state) {
      return filter.test(state.name); // || filter.test(state.id);
    }).filter(function(state) {
      return this.state.selected
        .map(function(value) { return value.name })
        .indexOf(state.name) === -1
    }.bind(this))
    this.setState({
      options: filteredNames
    });
  },

  renderComboboxOptions: function() {
    return this.state.options.map(function(name) {
      return (
        <ComboboxOption
          key={name.id}
          value={name}
        >{name.name}</ComboboxOption>
      );
    });
  },
   handleOnChange: function(date) {
    this.setState({
      startDate: date
    });
  },
  onChange: function() {
    console.log('onChange', arguments);
  },
  onClickItem: function() {
   console.log('onClickItem', arguments);
  },
  onClickThumb: function() {
    console.log('onClickThumb', arguments);
  }, 
  doSearch: function() {
    var formName = this.refs.formname.value;
    var vendor = this.state.selected;

    $.ajax({      
        url     : '/forms',
        data: { formName: formName, vendor: vendor, limit: '10', offset: this.state.offset },
        success: function(data) {
          this.setState({formdata: data.comments, pageNum: (data.meta.total_count / data.meta.limit)});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('/forms', status, err.toString());
        }.bind(this)
      });   
  }, 
  handleClick: function(data) {
    var selected = data.selected;
    this.setState({offset: Math.ceil((selected) * 10)}, function(){
          this.doSearch();
      }.bind(this));        
  },
	render(){console.log(this.state.formdata);
		 var selectedNames = this.state.selected.map(function(tag) {
      return <li key={tag.id}>{tag.name}</li>
    })

    var options = this.state.options.length ?
      this.renderComboboxOptions() : [];

    const loadingComponent = (
      <img src='spinner.gif' />
    )
  var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:1
    }
		return (
			<div className="container"> 
				<div className="row">  
					<Grid>
						<Row className="show-grid">
							<Col md={9}> <h1>Form Templates</h1> </Col>
							<Col md={3}><button className="btn btn-default btn-lg pull-right" onClick={this.navigate}>Add New Form Template</button></Col>
						</Row>
					</Grid>
				
					<InputGroup>
						<Row>
						<Col md={4}>
							<input type="text" ref="formname" name="formname" placeholder="Form Name or ID" className="form-control" maxlength="5"/>
						</Col>
						<Col md={2}>
							<TokenInput
            isLoading={this.state.loading}
            loadingComponent={loadingComponent}
            menuContent={options}
            onChange={this.handleChange}
            onInput={this.handleInput}
            onSelect={this.handleSelected}
            onRemove={this.handleRemove}
            selected={this.state.selected}
            placeholder='Vendors'
          />
						</Col>
						<Col md={2}>
							<input type="text"  ref="producttype" name="producttype" placeholder="Product Type" className="form-control" />
						</Col>
						<Col md={2}>
							<StateControl name="State"/>
						</Col>
						<Col md={2}>
							 <Button className="btnSearch" bsStyle="primary" onClick={this.doSearch}>Search</Button>             
						</Col>
						</Row>
					</InputGroup>
					 <div>
                 
<DatePicker
        selected={this.state.startDate}
        onChange={this.handleOnChange} />
        <h6>Vendors:</h6>
        <ul>
          {selectedNames}
        </ul>
            </div>
					<hr className="hrblack"/>   
					<div>                   
						<em>Use search above to display forms</em>

            <div>
              {(this.state.formdata!=undefined)?  <div className="my-component"><MyComponentList data={this.state.formdata} />{(this.state.formdata.length>0)?<nav id="project-pagination"><ReactPaginate  clickCallback={this.handleClick} previousLabel={"previous"} nextLabel={"next"} breakLabel={<a href="">...</a>}
               pageNum={this.state.pageNum} marginPagesDisplayed={2} pageRangeDisplayed={5}  containerClassName={"pagination"} subContainerClassName={"pages pagination"} activeClassName={"active"} /> </nav>:''} </div>: 'No records found'}
      
            </div>

             <Carousel axis="horizontal"  showThumbs={true} showArrows={true} onChange={this.onChange} onClickItem={this.onClickItem} onClickThumb={this.onClickThumb} autoAdvanceTime={2000}>
                <div>
                    <img src="assets/1.jpeg" />
                    <p className="legend">Image 1</p>
                </div>
                <div>
                    <img src="assets/2.jpeg" />
                    <p className="legend">Image desc 2</p>
                </div>
                <div>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Image desc 3</p>
                </div>
                
            </Carousel>
             <Slider {...settings}>
       <div>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Image 1</p>
                </div>
                <div>
                    <img src="assets/2.jpeg" />
                    <p className="legend">Image desc 2</p>
                </div>
                <div>
                    <img src="assets/1.jpeg" />
                    <p className="legend">Image desc 3</p>
                </div>
      </Slider>
					</div>  
				</div>
			</div>
		); 
	}
});

export default FormTemplates;



