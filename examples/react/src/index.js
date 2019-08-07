import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

if (process.env.NODE_ENV !== 'production') {
  const Reactotron = require('reactotron-react-js').default
  const reactotronUnistore = require('reactotron-unistore')

  const store = require('./store').default

  Reactotron.configure()
    .use(reactotronUnistore(store))
    .connect()

  Reactotron.clear()

  console.tron = Reactotron
}

ReactDOM.render(<App />, document.getElementById('root'));
