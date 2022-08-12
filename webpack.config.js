const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => { 
    const { mode } = argv;
    const isProduction = mode === 'production';

    return {
        output: {
            clean: true,
            filename: isProduction ? '[name].[contenthash].js' : '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    exclude: /styles.css$/i,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /styles.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"]
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
                // {
                //     test: /\.tsx?$/,
                //     use: "ts-loader",
                //     exclude: /node_modules/,
                // },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        optimization: {
            minimize: true,
            minimizer: [ 
                new CssMinimizerPlugin(),
                new TerserPlugin()
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({ template: './src/index.html' }),
            new MiniCssExtractPlugin({
                filename: isProduction ? '[name].[fullhash].css' : '[name].css'
            }),
            new CopyPlugin({
                patterns: [
                  { from: 'src/assets', to: 'assets' }
                ]
              }),
        ],
        devServer: {
            open: true,
            port: 3000,
            client: {
               overlay: true
            },
            compress: true
        }
    }
}