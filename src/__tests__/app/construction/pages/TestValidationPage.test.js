import React from 'react';
import TestValidationPage from '../../../../construction/pages/TestValidationPage/TestValidationPage';
import { shallow } from 'enzyme';


describe('Page: TestValidationPage', () => {

    const control = shallow(<TestValidationPage />);

    it('should match snapshot', () => {
        expect(control).toMatchSnapshot();
    });

    it('should have h1 element', () => {
        expect(control.find('h1')).toBeTruthy();
    });
});