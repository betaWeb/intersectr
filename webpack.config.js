const path = require('path')

module.exports = {
	mode: 'production',
	entry: [
		"core-js/stable",
		"regenerator-runtime/runtime",
		"intersection-observer/intersection-observer",
		"./src/Intersectr.js"
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: 'Intersectr.min.js'
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			}
		]
	},
	resolve: {
		extensions: ['*', '.js']
	}
};