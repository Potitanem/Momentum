const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;


module.exports = {
	mode,
	target,
	devtool,
	devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
	entry: path.resolve(__dirname, 'src', 'index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		filename: '[name].[contenthash].js',
		assetModuleFilename: 'assets/[name][ext]'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'index.html')
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		})
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
        test: /\.css$/i,
        use: [
					devMode ? "style-loader" :	MiniCssExtractPlugin.loader,
					"css-loader",
				],
      },
			{
				test: /\.(woff(2)?|ttf|eot|otf)?$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]'
				}
			},
			{
				test: /\.(jpe?g|png|gif|svg)?$/i,
				type: 'asset/resource',
				generator: {
					filename: 'img/[name][ext]'
				}
			},
			{
				test: /\.json?$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/[name][ext]'
				}
			},
			{
        test: /\.mp3$/i,
        type: 'asset/resource',
				generator: {
					filename: 'music/[name][ext]'
				}
      }
		]
	}
}