const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './entry.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		clean: true,
	},
	context: path.join(__dirname, 'src'),

	optimization: {
		minimize: false,
	},

	module: {
		rules: [
			{
				test: /\.pug/,
				use: ['raw-loader', 'pug-plain-loader'],
			},
			{
				test: /\.sss$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { importLoaders: 1 },
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['postcss-preset-env', 'precss'],
								parser: 'sugarss',
							},
						},
					},
				],
			},
		],
	},
	watch: true,
	watchOptions: {
		ignored: /dist/,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './pages/secPage.pug',
			filename: 'secPage.html',
		}),
		new HtmlWebpackPlugin({
			template: './pages/firstPage.pug',
			filename: 'firstPage.html',
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000,
	},
}
