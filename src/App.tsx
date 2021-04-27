import React from 'react';
import Background from './components/Background/Background';
import { Provider } from 'react-redux';
import store from './redux';
<<<<<<< HEAD

console.log('production is running', process.env.REACT_APP_HOST_ONLINE);
=======
>>>>>>> master

function App() {
  return (
    <Provider store={store}>

      <Background />
    </Provider>
  );
}

export default App;