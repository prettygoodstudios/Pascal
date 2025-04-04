const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
      rules: [
        {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              'style-loader',
              // Translates CSS into CommonJS
              'css-loader',
              // Compiles Sass to CSS
              'sass-loader',
            ],
          },
          {
            test: /\.m?js|jsx$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-transform-react-jsx']
              }
            }
          },
          {
            test: /\.(ttf|otf)$/,
            type: 'asset/resource'
        },
      ]
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, '/'),
        publicPath: '/',
      },
      {
        directory: path.join(__dirname, '/src/images'),
        publicPath: '/src/images',
        serveIndex: true,
      }
    ],
    compress: true,
    port: 9000,
  },
};