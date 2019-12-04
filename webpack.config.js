const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, './src/containers/VideoPlayer/index.js'),
	output: {
		filename: './index.js',
		path: path.join(__dirname, './build'),
		libraryExport: 'default',
		libraryTarget: 'amd'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						'@babel/preset-react',
						{
							plugins: [ '@babel/plugin-proposal-class-properties' ]
						}
					]
				}
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	},
	optimization: {
		minimizer: [ new UglifyJsPlugin() ]
	}
};
