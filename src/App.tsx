import React from 'react';
import Background from './components/Background/Background';
import { Provider } from 'react-redux';
import store from './redux';

function App() {

  return (
    <Provider store={store}>
      <Background />
    </Provider>
  );
}

export default App;