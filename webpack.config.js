const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        index: path.resolve(__dirname, "src", "interscroller.js")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "interscroller.html")
        })
    ],
    output: {
        library: 'dist',
        libraryTarget: 'umd',
        filename: 'interscroller.js',
        auxiliaryComment: 'Interscroller bundle',
        clean: {
            keep: /ignored\/dir\//, // Keep these assets under 'ignored/dir'.
        },
    }
};