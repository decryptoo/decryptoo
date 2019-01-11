'use strict';
const path = require('path');
const colors = require('colors');

module.exports = function (env, argv) {
    const prod = argv.mode === 'production';
    const mode = prod ? 'production' : 'development';
    console.log('Mode: ' + colors.yellow.bold(mode));
    return {
        mode: mode,
        entry: path.resolve('./js/app.ts'),
        devtool: prod ? 'none' : 'eval',
        externals: {
            'lodash': '_',
            'jquery': 'jQuery',
            'mobx': 'mobx',
            'mobx-react': 'mobxReact',
            'moment': 'moment',
            'react': 'React',
            'react-dom': 'ReactDOM'
        },
        devServer: {},
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
            filename: '[name].js',
            path: path.resolve('./build')
        },
        performance: {
            maxAssetSize: 10e6
        },
        plugins: []
    };
};
