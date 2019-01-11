import * as React from 'react';
import {PureComponent} from 'react';

export default class App extends PureComponent {
    public render(): React.ReactNode {
        console.log('render');
        return <div>
            <h1>Decriptoo</h1>
            <p>
                <button type="button">Start new game</button>
            </p>
        </div>;
    }
}
