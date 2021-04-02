import React, { useEffect } from 'react';
import Background from './components/Background/Background'
import { setTokenLocalStorage } from './utils/localStorage'
import { Provider } from 'react-redux';
import store from './redux';


function App() {


  // window.onresize = (e: any) => {
  //   console.log(visualViewport);

  // }


  return (
    <Provider store={store}>
      <Background />
    </Provider>
  );
}

export default App;