const path = require( 'path' );

const config = {
    entry: './zmidi.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            }
        ]
    }
};

const browserConfig = {
    ...config,
    output: {
        filename: 'zmidi.min.js',
        path: path.resolve( __dirname, 'dist' )
    }
};

const amdConfig = {
    ...config,
    output: {
        filename: 'zmidi.amd.js',
        path: path.resolve( __dirname, 'dist' ),
        libraryTarget: 'amd',
        umdNamedDefine: true
    }
};

const moduleConfig = {
    ...config,
    output: {
        filename: 'zmidi.js',
        path: path.resolve( __dirname, 'dist' ),
        libraryTarget: 'commonjs-module',
        umdNamedDefine: true
    }
};

module.exports = [
    browserConfig, amdConfig, moduleConfig
];
