module.exports = {
  mode: "production",
  entry: ["./src/index.tsx"],
  output: {
    // eslint-disable-next-line n/no-path-concat
    path: __dirname + "/dist",
    filename: "main.js",
  },
  context: __dirname,
  devtool: "source-map",
  devServer: {
    static: {
      // eslint-disable-next-line n/no-path-concat
      directory: __dirname + "/dist",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".html", ".css"],
  },
};
