const Path = require("path")

const { HotModuleReplacementPlugin } = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")

const src = Path.resolve(__dirname, "src")
const dist = Path.resolve(__dirname, "dist")


module.exports = {
    mode: "development",
    context: src,
    entry: {
        main: "./main.ts",
    },
    output: {
        filename: "[name].js",
        path: dist,
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(ts|js|vue)$/,
                exclude: /node_modules/,
                use: {
                    loader: "eslint-loader",
                    options: {
                        fix: true,
                    },
                },
            },
            {
                test: /\.vue$/i,
                use: "vue-loader",
            },
            {
                test: /\.pug$/i,
                oneOf: [
                    {
                        resourceQuery: /^\?vue/,
                        use: ["pug-plain-loader"]
                    },
                    {
                        use: "pug-loader",
                    }
                ]
            },
            {
                test: /\.ts$/i,
                use: {
                    loader: "ts-loader",
                    options: {
                        appendTsSuffixTo: [/\.vue$/i],
                    }
                },
            },
            {
                test: /\.styl(us)?$/i,
                use: ["vue-style-loader", "css-loader", "stylus-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: "file-loader",
            },
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.pug",
        }),
    ],
    resolve: {
        extensions: [".js", ".ts", ".vue"],
        alias: {
            "@": src,
        },
    },
    devServer: {
        contentBase: dist,
    },
}
