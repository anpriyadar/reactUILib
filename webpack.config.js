const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

var BUILD_DIR = path.join(__dirname, "lib")
var APP_DIR = path.join(__dirname, "src")

const jsRegex = /\.(js|jsx)$/

const packageJson = require(path.resolve(__dirname, "package.json"))

module.exports = {
  mode: "production",
    entry: "./src/components/mButton",
    output: {
        path: path.join(__dirname, "/dist"), // the bundle output path
        filename: "bundle.js", // the name of the bundle
      },
      module: {
        rules: [
          {
            enforce: "pre",
            test: jsRegex,
            exclude: /node_modules/,
            loader: "eslint-loader",
          },
          { test: /\.css$/, use: ["style-loader", "css-loader"] },
          {
            test: jsRegex,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
              },
            },
          },
        ],
      },
      externals: [
        {
          react: {
            root: "React",
            commonjs2: "react",
            commonjs: ["react"],
            amd: "react",
          },
        },
        /@material-ui\/core\/.*/,
      ],
      resolve: {
        extensions: [".js", ".jsx"],
      },
      plugins: [new CleanWebpackPlugin()],
    }