const path = require('path')

module.exports = {
  entry: './src/main.js', // Path to your main JavaScript file
  output: {
    filename: 'bundle.js', // The output filename
    path: path.resolve(__dirname, 'dist'), // The output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Optional: use Babel to transpile ES6+ code
        },
      },
    ],
  },
  mode: 'production', // Can be 'development' or 'production'
}
