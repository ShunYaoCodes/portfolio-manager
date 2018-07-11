import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//import { createStore } from 'redux';
//import { Provider } from 'react-redux';
//import reducer from './reducers';
import 'semantic-ui-css/semantic.min.css';

//const store = createStore(reducer);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
