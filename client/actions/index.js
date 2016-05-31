import $ from 'jquery'
export const FORMS_REQUEST = 'FORMS_REQUEST'
export const FORMS_SUCCESS = 'FORMS_SUCCESS'
export const FORMS_FAILURE = 'FORMS_FAILURE'

// export const FORM_ADD = 'FORM_ADD'
// export const FORM_UPDATE = 'FORM_UPDATE'
// export const FORM_DELETE = 'FORM_DELETE'

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function receiveForms(forms) {
	return {
		type: FORMS_SUCCESS,
		forms
	}
}

export function fetchForms() {
	return (dispatch) => {
		$.getJSON('/forms').done(function(result) {
			return dispatch(receiveForms(result))
		});
	}
}
export function login(login, password) {
   return {
      type: LOGIN,
      login,
      password
   }
}






