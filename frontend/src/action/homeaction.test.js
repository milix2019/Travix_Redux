/* eslint-disable no-undef */
import 'babel-polyfill';
import moxios from 'moxios';

describe('fetch_getnotes_data action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('Store is updated correctly', () => {
    const expectedState = {
      data: {
        getnotes: [],
        loading_getnotes: false,
      },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState,
      });
    });
  });
});
