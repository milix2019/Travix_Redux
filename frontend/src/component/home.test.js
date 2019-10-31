/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Home from './Home';

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<Home {...props} />);
  return component;
};

const findByTestAtrr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

describe('Home Component', () => {
  describe('Have props', () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        title: 'Test title',
        note: 'Test note',
      };
      wrapper = setUp(props);
    });
    it('Should render without errors', () => {
      const component = findByTestAtrr(wrapper, 'homeComponent');
      expect(component.length).toBe(1);
    });
    it('Should render a AddBox', () => {
      const h1 = findByTestAtrr(wrapper, 'addboxComponent');
      expect(h1.length).toBe(1);
    });
    it('Should render a CardHolder', () => {
      const desc = findByTestAtrr(wrapper, 'cardHolderComponent');
      expect(desc.length).toBe(1);
    });
  });
  describe('Have NO props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setUp();
    });
    it('Should not render', () => {
      const component = findByTestAtrr(wrapper, 'homeComponent');
      expect(component.length).toBe(1);
    });
  });
});
