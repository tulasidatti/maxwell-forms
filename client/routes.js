import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './views/app';
import Forms from './views/formTemplates';
import Form from './views/form.js';
import AddFormTemplate from './views/addFormTemplate.js';
import Home from './views/home.js';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Forms} />
		<Route path="/addFormTemplate" component={AddFormTemplate}/>
		<Route path="/addFormTemplate/:msg" component={AddFormTemplate}/>
		<Route path="/forms" component={Forms}/>
		<Route path="/login" component={Home}/>
	</Route>
);