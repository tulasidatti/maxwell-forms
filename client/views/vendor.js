import React from 'react';

export default class VendorControl extends React.Component{
  render(){
    return (
			<input id="vendor" name="vendor" className="form-control" type="text" placeholder={this.props.name}  ref="vendor" onChange={this.props.functionname}/>

   );
  }
}