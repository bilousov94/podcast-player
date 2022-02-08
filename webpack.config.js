module.exports = {
    entry: './views/index.js',
    mode: 'development',
    output: {
        path: __dirname + '/public/bundles',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude:  '/node_modules'
            },
        ]
    },
};