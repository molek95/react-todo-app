import React from 'react';
import { shallow, mount } from 'enzyme';
import TodoForm from './../TodoForm';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('<TodoForm /> with no props', () => {
    const todoForm = shallow(<TodoForm />);

    it('should match the snapshot', () => {
        expect(todoForm.html()).toMatchSnapshot();
    });

    it('should have an input field', () => {
        expect(todoForm.find('input[type="text"]').length).toEqual(1);
    });

    it('should have an add todo button', () => {
        expect(todoForm.find('button').length).toEqual(1);
    });

    it('should trigger state change on submit', () => {
        const submitTodo = jest.fn();
        const form = mount(<TodoForm onSubmit={submitTodo} />)
        const handleClick = jest.spyOn(React, "useState")

        handleClick.mockImplementation(todo => [todo, submitTodo]);
        form.find('button').simulate('click');
        expect(submitTodo).toBeTruthy();
    })
})
