import React, { useEffect } from 'react';
import Background from './components/Background/Background'
import { setTokenLocalStorage } from './utils/localStorage'
import { Provider } from 'react-redux'
import store from './redux'
import socket from './socket'

function App() {
  return (
    <Provider store={store}>
      <Background />
    </Provider>
  );
}

export default App;
