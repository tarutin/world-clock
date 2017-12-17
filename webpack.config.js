const webpack = require('webpack')

module.exports = {
    watch: true,
    target: 'electron',
    entry: './app/view/index.js',

    output: {
        path: __dirname + '/app/static',
        publicPath: '/app/static/',
        filename: 'build.js',
    },

    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]',
                },
            },
        ],
    },

    resolve: {
        alias: { vue: 'vue/dist/vue.js' },
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: false,
        }),
    ]
}
