import React from 'react';
import { shallow } from 'enzyme';
import TodoList from './../TodoList';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('<TodoList /> with no props', () => {
    const todoList = shallow(<TodoList />);

    it('should match the snapshot', () => {
        expect(todoList.html()).toMatchSnapshot();
    });

})
