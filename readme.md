# reactotron-unistore

## Config
The `reactotronUnistore` function requires your unistore store to be passed in as the only arguement. This is a pretty generic Reactotron setup. React example can be [viewed here](https://github.com/kidqueb/reactotron-unistore/tree/master/examples/react)

```javascript
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
}

ReactDOM.render(<App />, document.getElementById('root'));

```

In the example the `<Provider />` and config import the store from a single `./store` module that exports unistore's `createStore({))`

## Accessing Root State
By default `reactotron-unistore` will return the entire state when inputing any of these values: `["", "*", ".*", "root", "root.*"]`
