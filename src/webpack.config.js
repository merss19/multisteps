var webpack = require("webpack")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var path = require("path")

console.log(__dirname)
console.log('__dirname')

module.exports = {
    entry: [
        "react-hot-loader/patch",
        "webpack-dev-server/client?http://localhost:8100",
        __dirname + "/index.tsx",
        __dirname + "/assets/sass/styles.scss"
    ],
    output: {
        filename: "bundle.js",
        path: __dirname + "../dist",
        publicPath: "/"
    },
    devtool: "source-map",
  // devtool: 'eval',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "tslint-loader",
                include: [path.join(__dirname, "/")],
                exclude: /(node_modules)/,
                enforce: "pre"
            },
            {
                test: /\.scss$/,
                include: [path.join(__dirname, "/"), path.join(__dirname, "/assets")],
                loader: "style-loader!css-loader!sass-loader"
            },
            {
                test: /(\.ts|\.tsx)$/,
                include: [path.join(__dirname, "/")],
                loader: ["react-hot-loader/webpack", "awesome-typescript-loader"]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: "file-loader?name=[path][name].[ext]"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: ["source-map-loader"]
            }
        ]
    },
    resolve: {
        modules: [path.join(__dirname, "/components"), "node_modules"],
        extensions: [".tsx", ".ts", ".js", ".svg"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    devServer: {
        port: 8100,
        hot: true,
        publicPath: "/",
        historyApiFallback: true,
        host: "localhost",
        inline: true
    }
};