const path = require('path');
const webpack = require('webpack');
const isModern = process.env.BROWSERSLIST_ENV === 'modern'

module.exports = {
    entry: {
        main: [
            isModern ? './src/js/polyfills.modern.js' : './src/js/polyfills.legacy.js',
            'jquery',
            './src/js/main.js',
        ],
        head: './src/js/head.js'
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]-' + (isModern ? 'modern' : 'legacy') + '.js'
    },

    module: {
        rules: [
            { // configure babel
                test: /\.js$/,
                include: /\/(src|foundation-sites)\//,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                debug: false,
                                useBuiltIns: 'usage',
                            }],
                        ]
                    }
                }
            },
            { // make jQuery available as global variable
                test: require.resolve('jquery'),
                use: [{
                  loader: 'expose-loader',
                  options: 'jQuery'
                },{
                  loader: 'expose-loader',
                  options: '$'
                }]
              }
        ]
    },

    plugins: [
        new webpack.SourceMapDevToolPlugin({
            test: [/\.js$/],
            filename: '[name]-' + (isModern ? 'modern' : 'legacy') + '.js.map',
            append: '//# sourceMappingURL=[url]',
        })
    ]
};
