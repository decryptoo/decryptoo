import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './component/App';

require('../css/app.styl');

const app = document.querySelector('.app');
ReactDOM.render(<App/>, app);
