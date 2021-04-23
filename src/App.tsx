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



function App() {
  return (
    <Provider store={store}>

      <Background />
    </Provider>
  );
}

export default App;