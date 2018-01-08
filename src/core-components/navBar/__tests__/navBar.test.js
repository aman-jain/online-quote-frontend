
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import NavBar from '../index';
import '../../../setupTests';
describe('NavBar Component', () => {
 
    // make our assertion and what we expect to happen 
    it('should render without throwing an error', () => {
      
      expect(shallow(<NavBar/>).exists(<nav></nav>)).toBe(true)
    })
})
