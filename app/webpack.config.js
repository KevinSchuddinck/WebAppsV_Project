const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, 'src')
        ],
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        },
      },
      {
        test: /\.html$/,
        use: [
          'htmllint-loader',
          {
            loader: 'html-loader'
          }
        ]
      }
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      __dirname
    ],
    extensions: ['.js', '.json', '.jsx', '.css']
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  devtool: 'source-map',
  context: __dirname,
  target: 'web',
  externals: [/^@angular\//],
  stats: 'errors-only',
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    noInfo: true
  }
}
