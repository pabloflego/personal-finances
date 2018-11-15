import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './shared/store';
import * as serviceWorker from './shared/serviceWorker';
import ErrorBoundary from './components/ErrorBoundary';

import App from './components/App';
import Admin from './components/Admin';
import './index.css';

render((
  <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/admin' component={Admin}/>
          <Route path='/' component={App}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
