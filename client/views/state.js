import React from 'react';

export default class StateControl extends React.Component{
  render(){
    return (		
			<input id="state" name="state" className="form-control"  type="text" placeholder={this.props.name} ref= "state"/>		
		);
  }
}