import React from 'react';
import Background from './components/Background/Background';
import { Provider } from 'react-redux';
import store from './redux';
import { emiteCloseConnection } from './socket/emitters';


window.addEventListener('beforeunload', function (e) {
  setTimeout(() => {

    emiteCloseConnection();
    e.preventDefault();
    e.returnValue = 'Enserio?';
  }, 2000);
});

console.log('production is running', process.env.REACT_APP_HOST_ONLINE);

function App() {
  return (
    <Provider store={store}>

      <Background />
    </Provider>
  );
}

export default App;