import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';

// components
import Welcome from './components/Welcome';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Features from './components/Features';

// reducers
import reducers from './reducers';

ReactDOM.render(
  <Provider store={createStore(reducers, {})}>
    <BrowserRouter>
      <App>
        <Route path='/' component={Welcome} exact />
        <Route path='/signup' component={SignUp} exact />
        <Route path='/signin' component={SignIn} exact />
        <Route path='/features' component={Features} exact />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);