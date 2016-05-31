'use strict';
//jest.autoMockOff();
jest.unmock('../../../client/views/formTemplates');
jest.unmock('react-router');
jest.unmock('react-dom');
jest.unmock('react-addons-test-utils');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import FormTemplate from '../../../client/views/formTemplates';


describe('FormTemplate', () => {
	
	const parentControl = TestUtils.renderIntoDocument(<FormTemplate />);

	it("Gets all four input type textboxes", function () {		
		const inputs = TestUtils.scryRenderedDOMComponentsWithClass(parentControl, 'form-control');
		expect(inputs.length).toEqual(2);
	});
	
	it("Gets button control", function () {
		const textarea = TestUtils.scryRenderedDOMComponentsWithTag(parentControl, 'button');
		expect(textarea.length).toEqual(2);
	});

 	it('Stimulates click event of Add new Form Button', function() {
		const formTemplate = TestUtils.renderIntoDocument(<FormTemplate />)
		const link = TestUtils.findRenderedDOMComponentWithTag(formTemplate, 'a')
		TestUtils.Simulate.click(link);		
		expect(ReactDOM.findDOMNode(link).textContent).toBe('Add New Form Template');		
 	})

});

