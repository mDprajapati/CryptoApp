import logo from './logo.svg';
import './App.css';
import rootReducer from './redux/root-reducer/root-reducer';
import { Provider } from 'react-redux';
import Routeing from './route/route';
import { createStore } from 'redux';
import React  from 'react';
function App() {
  const store  = createStore(rootReducer)
  return (
    <Provider store={store}>
  <Routeing />
    </Provider>
  );
}

export default App;
