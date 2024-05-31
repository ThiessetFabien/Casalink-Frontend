// eslint-disable-next-line import/no-extraneous-dependencies
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import actionCheckLogin from '../../store/thunks/checkLogin';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actionCheckLogin', () => {
  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it('creates CHECK_LOGIN when login has been done', () => {
    moxios.wait(function () {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { token: 'fake_token', data: { account: 'fake_account' } },
      });
    });

    const expectedActions = [
      { type: 'user/CHECK_LOGIN/pending' },
      {
        type: 'user/CHECK_LOGIN/fulfilled',
        payload: { token: 'fake_token', account: 'fake_account' },
      },
    ];

    const store = mockStore({
      user: {
        credentials: {
          login: { emailSignin: 'test@test.com', passwordSignin: 'password' },
        },
      },
    });

    return store.dispatch(actionCheckLogin()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
