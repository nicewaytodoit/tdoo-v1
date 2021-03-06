import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './containers/App/App';
import TestPage from './construction/pages/TestPage/TestPage';
import TestValidationPage from './construction/pages/TestValidationPage/TestValidationPage';
import store from './storage/store';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';

const app = (
    <Provider store={store}>
        <TestPage />
        <TestValidationPage />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
