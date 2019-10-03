import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer'
// import { PersistGate } from 'redux-persist/integration/react'

// console.log(createStore)
const store = createStore(rootReducer)

// What is {persistor}?
// <PersistGate loading={null} persistor={persistor}></PersistGate>

ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <App />
    </BrowserRouter >
  </Provider>, document.getElementById('root')
);

