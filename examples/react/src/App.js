import React from "react";
import { Provider, connect } from "unistore/react";

import store from "./store.js";

const actions = store => {
  return {
    setUserUsername: (_, username) => ({ username }),
    setUserFirstname: (_, firstName) => ({ firstName }),
    setUserLastname: async (_, lastName) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { lastName }
    }
  }
};

const Form = connect("username, firstName, lastName", actions)(props => {
  const [userVals, setUserVals] = React.useState({
    username: "",
    firstName: "",
    lastName: ""
  });

  function handleInput(key, val) {
    setUserVals({ ...userVals, [key]: val });
  }

  const funcs = {
    username: props.setUserUsername,
    firstName: props.setUserFirstname,
    lastName: props.setUserLastname
  };

  function handleSubmit(e, key) {
    e.preventDefault();
    funcs[key](userVals[key]);
  }

  return (
    <>
      {["username", "firstName", "lastName"].map(key => (
        <form key={key} onSubmit={e => handleSubmit(e, key)}>
          <p>
            <label>{key}:</label>
            <input
              value={userVals[key]}
              onChange={e => handleInput(key, e.target.value)}
            />
          </p>
          <p>
            Unistore {key} value: {props[key]}
          </p>
        </form>
      ))}
    </>
  );
});

const App = () => (
  <Provider store={store}>
    <Form />
  </Provider>
);

export default App;
