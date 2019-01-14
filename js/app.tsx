import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './component/App';
import Theme from './theme/Theme';

Theme.use('light');

const app = document.querySelector('div.app');
ReactDOM.render(<App/>, app);
