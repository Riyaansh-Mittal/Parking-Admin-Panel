import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@redux/store';
import AppRoutes from '@routes';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
