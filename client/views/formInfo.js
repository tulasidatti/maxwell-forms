import React from 'react';
import { Link, browserHistory } from 'react-router'
import VendorControl from './vendor'
import StateControl from './state'

const FormInfo = React.createClass({	
	
	getInitialState: function() {
		return { showResults: false,
				 showErrorMssg: false,
				 isActive: 'btn btn-primary pull-right has-spinner',
				 mssg: this.props.msg };
	},
	onChange: function(event) {   		
		if (event.target.value.length>=255) {
			this.setState({ showResults: true });
			
		}
		else {
			this.setState({ showResults: false });
		}
	},
	validateNotes: function(event) {
		
		if (event.target.value.length>=500) {
			this.setState({ showErrorMssg: true });
			
		}
		else {
			this.setState({ showErrorMssg: false });
		}
	},
	validateFile: function(event) {
		
		var myfile = event.target.value;
		var ext = myfile.split('.').pop().toLowerCase();
		
		if (ext !='pdf') {
			this.refs.file.value = '';
			this.setState({ showErrMssg: true });
			
		}
		else {
			this.setState({ showErrMssg: false });
		}
	},
	contextTypes: {
		router: React.PropTypes.object		
	},   
	
	navigate(event) {		
		 event.preventDefault() 
		if(this.refs.formname.value !=='' || this.refs.stateinput.refs.state.value !=='' || this.refs.vendorinput.refs.vendor.value !=='' || this.refs.notes.value !=='' || this.refs.file.value !=='') {
			if(confirm('You have unsaved information, are you sure you want to leave this page?')){			 
				this.context.router.push('/')  
			}
		}
		else {
			this.context.router.push('/')  	;
		}
	},
 	handleSubmit: function(e) {
		this.setState({ isActive: "btn btn-primary pull-right has-spinner active" });
		return;
	},
	handleVendorChange: function()
    {
        var theVal = this.refs.vendorinput.refs.vendor.value
        this.props.onVendorUpdate(theVal);        
    },
	componentWillMount: function() {
		if(this.state.mssg=='success') {			
			Messenger().post({
				message: 'FormTemplate created successfully!',
				type: 'success'
			});
			this.setState({ mssg: '' });
			//browserHistory.push('/#/addTemplate');
		}else if(this.state.mssg=='failure') {		
			Messenger().post({
				message: 'Failed to Create FormTemplate. Please try again',
				type: 'error',
				showCloseButton: true
			});
			this.setState({ mssg: '' });
			//browserHistory.push('/#/addTemplate');
		}	
	},
	render(){
		
		return (

			<div className="container panel">
				<div className="col-sm-12">
					<section className="panel">
						<div className="panel-body">
							<div className="row todo-action-bar">
								<form className="formInfo" role="form" data-toggle="validator" name="addFormTemplate" id="addFormTemplate" method="post" action="/forms" encType="multipart/form-data" onSubmit={this.handleSubmit}>
									<div className="row">
										<div className="col-md-8 form-group">
											<label>Form Name * </label>							  
												<input onChange={this.onChange} id="formname" name="name" className="form-control" type="text" maxLength="255" ref="formname" required/>
												{ this.state.showResults ? <span className="showErrorMsg">Can not be more than 255 letters.</span> : '' }	 
										</div>
										<div className="col-md-4 form-group">

										</div>
										<div className="col-md-8 form-group">
											<label>Vendor  </label>
											<VendorControl ref="vendorinput" functionname={this.handleVendorChange}/>
										</div>
										<div className="col-md-4 form-group">
											<label>State</label>
											<StateControl ref="stateinput"/>
										</div>
										 <div className="col-md-8 form-group">
											<label>Notes</label>
											<textarea id="notes" name="notes" onChange={this.validateNotes} className="form-control" id="notes" maxLength="500" type="text" ref="notes"></textarea>
											{ this.state.showErrorMssg ? <span className="showErrorMsg">Can not be more than 500 letters.</span> : '' }	 
										</div>
										<div className="col-md-4 form-group">
											
										</div>
										<div className="col-md-8 form-group">
											<label>Choose Pdf * </label>
											<input type ="file" id="file" name="file" className="form-control-file" accept="application/pdf" ref="file" onChange={this.validateFile}  required/> ( Max 20MB )
											{ this.state.showErrMssg ? <span className="showErrorMsg">  Please choose only pdf files.</span> : '' }	 								
										</div>							
										<div className="col-md-4 form-group">								
										</div>					
									</div>				
									<div className="row">
										<hr className="hrblack"/>
									</div>
									<div className="col-md-12">
										<button type="submit" className={ this.state.isActive } id="Save" name="Save"><span className="spinner"><i className="fa fa-refresh fa-spin"></i></span> Save</button>									
										<button className="btn btn-default pull-right" onClick={this.navigate}>Cancel</button>
									</div>
								</form>
							</div>
						</div>
					</section>
				</div>
			</div>
		);  
	}
})

export default FormInfo;