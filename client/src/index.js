import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route, Switch } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import jwt from 'jsonwebtoken';

import Main from './components/Main';
import SingleCourse from './components/SingleCourse';
import Login from './components/Login';
import reducer from './reducers/index';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { authSuccess } from './actions';

const history = createHistory();
const middleware = routerMiddleware(history);

const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(
  reducer,
  enhancers,
  applyMiddleware(middleware, thunk)
);
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  var { user } = jwt.decode(localStorage.jwtToken);
  store.dispatch(authSuccess(user));
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Main} />
        <Route path="/current-course" component={SingleCourse} />
        <Route
          render={() => {
            return <div> 404 Not Found</div>;
          }}
        />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('wygpa-root')
);
