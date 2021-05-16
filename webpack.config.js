const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

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
			{
				test: /\.pug/,
				use: ['raw-loader', 'pug-plain-loader'],
			},
			{
				test: /\.(sss|css)$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: './asset/css/[name].css',
						},
					},
					{
						loader: 'css-loader',
						options: { importLoaders: 2 },
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: (loaderContext) => {
								//console.log(loaderContext.resourcePath)
								return {
									plugins: ['postcss-preset-env', 'precss'],
								}
							},
						},
					},
				],
			},
		],
	},

	optimization: {
		minimize: false,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: false,
				},
			}),
		],
	},
	watch: true,
	watchOptions: {
		ignored: /dist/,
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
		new MiniCssExtractPlugin({
			filename: (filename) => {
				return `./assets/css/[name].css`
			},
		}),
		new HtmlWebpackPlugin({
			template: './pages/secPage.pug',
			filename: 'secPage.html',
			inject: 'body',
		}),
		new HtmlWebpackPlugin({
			template: './pages/firstPage.pug',
			filename: 'firstPage.html',
			inject: 'body',
		}),
		new CopyPlugin({
			patterns: [
				{ from: './js/plugins', to: './assets/js/plugins' },
				{ from: './css/plugins', to: './assets/css/plugins' },
			],
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000,
	},
}

//'assets/css/[name].css'
