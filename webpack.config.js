'use strict';
const path = require('path');
const colors = require('colors');

(function () {
    const log = console.log;
    const fix = function (o) {
        if (typeof o === 'string') {
            return o
                .replace(/(\x1b\[94m)/g, '\x1b[36m')
                .replace(/(\x1b\[34m)/g, '\x1b[36m')
                .replace(/｢/g, '\[')
                .replace(/｣/g, '\]');
        } else {
            return o;
        }
    };
    const fixa = function (args) {
        return Array.from(args).map(o => fix(o));
    };
    const log2 = function () {
        log.apply(null, fixa(arguments));
    };
    console.info = log2;
    console.debug = log2;
    console.log = log2;
})();

module.exports = function (env, argv) {
    const prod = argv.mode === 'production';
    const mode = prod ? 'production' : 'development';
    console.log('Mode: ' + colors.yellow.bold(mode));
    return {
        mode: mode,
        entry: path.resolve('./js/app.tsx'),
        devtool: prod ? 'none' : 'eval',
        externals: {
            'lodash': '_',
            'classnames': 'classNames',
            'mobx': 'mobx',
            'mobx-react': 'mobxReact',
            'react': 'React',
            'react-dom': 'ReactDOM'
        },
        devServer: {
            contentBase: path.resolve('.')
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: ['ts-loader', {
                    loader: 'tslint-loader',
                    options: {
                        formatter: 'verbose'
                    }
                }],
                exclude: /node_modules/
            }, {
                test: /\.styl$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'stylus-loader',
                    options: {
                        'resolve url': true,
                        preferPathResolver: 'webpack'
                    }
                }]
            }]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            filename: 'build/[name].js',
            path: path.resolve('.')
        },
        performance: {
            maxAssetSize: 10e6
        },
        plugins: []
    };
};
