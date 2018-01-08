
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Notification from '../index';
import '../../../setupTests';
describe('NavBar Component', () => {
 

    it('should render with props', () => {
        const props = {
            message: ['This is a message'],
            style: 'success'
        }
        const notification = shallow(<Notification {...props}/>);
        expect(notification.find('div')).toHaveLength(1);
      })
})
