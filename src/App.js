import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import RootRoutes from './pages';
import configureStore from './store';
import Modal from './containers/Modal';

const { store } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <RootRoutes />
        <Modal />
      </Router>
    </Provider>
  );
}

export default App;
