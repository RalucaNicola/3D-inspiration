const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: ["./src/index.js"],
    vendor: ["react", "react-dom", "material-ui"]
  },
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "/")
  },
  devServer: {
    contentBase: path.join(__dirname, "/"),
    port: 8080
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false, //prod
      sourceMap: true,
      output: {
        comments: false
      }, //prod
      mangle: {
        except: ['$', 'require'],
        screw_ie8: true,
        keep_fnames: true
      }, //prod
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false // we need this for lazy v8
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"}
        ]
      },{
        test: /\.png$/,
        use: [
          {loader: "url-loader"}
        ]
      }
    ]
  }
}