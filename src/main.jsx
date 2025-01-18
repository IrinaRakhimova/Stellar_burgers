import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './index.css';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/rootReducer';
import { createStore } from 'redux';
import { enhancer } from './services/store';


const store = createStore(rootReducer, enhancer);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

