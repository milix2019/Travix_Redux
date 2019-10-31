/* eslint-disable no-undef */
import 'babel-polyfill';
import React from 'react';
import checkPropTypes from 'check-prop-types';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import AddBox from './AddBox';

configure({ adapter: new Adapter() });

const findByTestAtrr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
  return propsErr;
};


describe('AddBox Component', () => {
  describe('Checking PropTypes', () => {
    it('Should NOT throw a warning', () => {
      const expectedProps = {
        buttonText: 'Example Button Text',
        emitEvent: () => {
        },
      };
      const propsError = checkProps(AddBox, expectedProps);
      expect(propsError).toBeUndefined();
    });
  });

  describe('Renders', () => {
    let wrapper;
    let mockFunc;
    beforeEach(() => {
      mockFunc = jest.fn();
      const props = {
        buttonText: 'Example Button Text',
        emitEvent: mockFunc,
      };
      wrapper = shallow(<AddBox {...props} />);
    });

    it('Should Render a button', () => {
      const button = findByTestAtrr(wrapper, 'closeComponent');
      expect(button.length).toBe(1);
    });
  });
});
