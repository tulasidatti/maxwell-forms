/*eslint-disable import/default*/

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, useRouterHistory } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory'
const history = useRouterHistory(createHashHistory)({
	queryKey: false
})
import routes from './routes';
import configureStore from './store/configureStore';
import {fetchForms}  from './actions'

const store = configureStore();
store.dispatch(fetchForms());

render(
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>
	, document.getElementById('app')
);