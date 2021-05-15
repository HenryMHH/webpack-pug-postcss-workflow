const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// let MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	entry: './entry.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		clean: true,
	},
	context: path.join(__dirname, 'src'),
	module: {
		rules: [
			// 	{
			// 		test: /\.css$/i,
			// 		use: [
			// 			{
			// 				loader: MiniCssExtractPlugin.loader,
			// 			},
			// 			'css-loader',
			// 		],
			// 	},
			{
				test: /\.pug/,
				use: ['raw-loader', 'pug-plain-loader'],
			},
			// 	{
			// 		test: /\.html$/,
			// 		use: ['html-loader'],
			// 	},
			// 	{
			// 		test: /\.(svg|png|ico|jpg|gif)$/,
			// 		loader: 'file-loader',
			// 		options: {
			// 			name: '[path][name].[ext]',
			// 		},
			// 	},
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
		// new MiniCssExtractPlugin(),
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000,
	},
}
