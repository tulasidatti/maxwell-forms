import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { login } from '../actions'
import LoginForm from './LoginForm'

var Home = React.createClass({
  render: function() {console.log(this.props);
     const { dispatch } = this.props;
  
    return (
    <div>

            <LoginForm onSubmit={(id, pass) =>
               this.props.login(id, pass)
            } />

         </div>
      );
     
  }
});


function mapStateToProps(state) {console.log("mapprops");console.log(state)
  return {
    user: state.user
  }
}
function mapDispatchToProps(dispatch) { //console.log("disptch");console.log(dispatch);
  return bindActionCreators({ login },dispatch);
}
export default connect(
  mapStateToProps,mapDispatchToProps
)(Home)