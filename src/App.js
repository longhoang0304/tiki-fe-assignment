import React from 'react';
import { Provider } from 'react-redux';
import RootRoutes from './pages';
import configureStore from './store';

const { store } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <RootRoutes />
    </Provider>
  );
}

export default App;
