import  React,{ Component, PropTypes } from 'react'

class LoginForm extends Component {
   render () {
      return (
         <div>

            <form action="#" onSubmit={(e) => this.handleSubmit(e)}>
               <input type="text" ref={node => { this.login = node }} />
               <input type="password" ref={node => { this.password = node }} />
               <input type="submit" value="Login" />
            </form>
         </div>
      )
   }

   handleSubmit(e) {
      e.preventDefault();
      this.props.onSubmit(this.login.value, this.password.value);
   }
}

LoginForm.propTypes = {
   onSubmit: PropTypes.func.isRequired
};

export default LoginForm;