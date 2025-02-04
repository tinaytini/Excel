//This imports Node.js's built-in path module, which helps with handling file and directory paths.
require('dotenv').config({ path: "./.env" })
const webpack = require("webpack")
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv) => {

    const isProd = argv.mode = 'production'
    const isDev = !isProd

    const fileName = (ext) => isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`
    const plugins = () => {
        const base = [
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            new FaviconsWebpackPlugin({
                logo: './favicon.ico'
            }),
            new MiniCssExtractPlugin({
                filename: fileName('css')
            }),
            new webpack.DefinePlugin({
                'process.env.OPENAI_API_KEY': JSON.stringify(process.env.OPENAI_API_KEY)
            })
            
        ]
        if (isDev) {
            base.push(new ESLintPlugin())
        }
        return base
    }
    

    return {
        target: 'web',
        context: path.resolve(__dirname, 'src'),
        entry: {
            main:
                [
                    'core-js/stable',
                    'regenerator-runtime/runtime',
                    './index.js'
                ]
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: fileName('js'),
            clean: true,
        },
        resolve: {
            extensions: ['.js'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                'core': path.resolve(__dirname, 'src', 'core')
            }
        },
        plugins: plugins(),
        devServer: {
            port: '3000',
            open: true,
            hot: true,
            watchFiles: './',
        },
        devtool: isDev ? 'eval-source-map' : 'source-map',
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        MiniCssExtractPlugin.loader,
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",

                    ],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ],
        },
    }
}