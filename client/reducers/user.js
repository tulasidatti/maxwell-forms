import { LOGIN, BAD_LOGIN, LOGOUT } from '../actions'
import $ from 'jquery'

/*const initialState = {
   cid: null,
   username: '',
   logo: '',
   loginError: '',
   loginSuccess: ''

};*/

const user = (state = [], action) => {
   switch (action.type) {
      case LOGIN:
        /* const api = new loginApi; //simple version
         api.login(action.login, action.password)
            .done(res => {
               //Right here ?
            })
            .fail(err => console.error(err));*/
            /*$.post('/login', {"username":action.login, "password": action.password}).done(function(result) {
                  return result;
               });*/

            $.post('/login', {"username":action.login, "password": action.password},(data) => { 
             return data.status;

            });   

      case LOGOUT:
         //...
         return state;

      default:
         return state;
   }
};

export default user;