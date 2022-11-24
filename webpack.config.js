const path = require("path");

module.exports = {
    entry: {
        index: path.resolve(__dirname, "src", "interscroller.js"),
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