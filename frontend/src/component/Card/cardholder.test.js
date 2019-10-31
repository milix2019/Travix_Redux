/* eslint-disable no-undef */
import 'babel-polyfill';
import React from 'react';
import checkPropTypes from 'check-prop-types';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import CardHolder from './CardHolder';

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<CardHolder {...props} />);
  return component;
};

const findByTestAtrr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};
const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
  return propsErr;
};

describe('CardHolder Component', () => {
  describe('Checking PropTypes', () => {
    it('Should not throw a warning', () => {
      const expectedProps = {
        fetch_getnotes_data: jest.fn(),
        getnotes: [{
          title: 'Test title',
          note: 'Test note',
          is_deleted: false,
          id: 23,
          create_at: "2019-10-31",
        }],
        createData: [{
          title: 'Test title',
          note: 'Test note',
          is_deleted: false,
          id: 23,
          create_at: "2019-10-31",
        }],
      };
      const propsErr = checkProps(CardHolder, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Have props', () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        fetch_getnotes_data: jest.fn(),
        getnotes: [{
          title: 'Test title',
          note: 'Test note',
          is_deleted: false,
          id: 23,
          create_at: "2019-10-31",
        }],
        createData: [{
          title: 'Test title',
          note: 'Test note',
          is_deleted: false,
          id: 23,
          create_at: "2019-10-31",
        }],
      };
      wrapper = setUp(props);
    });
    it('Should render searchboxComponent', () => {
      const component = findByTestAtrr(wrapper, 'searchboxComponent');
      expect(component.length).toBe(1);
    });
    it('Should render a snackbarComponent', () => {
      const h1 = findByTestAtrr(wrapper, 'snackbarComponent');
      expect(h1.length).toBe(1);
    });
  });

  describe('Have NO props', () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        fetch_getnotes_data: jest.fn(),
      };
      wrapper = setUp(props);
    });
    it('Should not render', () => {
      const component = findByTestAtrr(wrapper, 'cardsComponent');
      expect(component.length).toBe(0);
    });
  });
});
