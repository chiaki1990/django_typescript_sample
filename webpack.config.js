const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // モード
  mode: 'development',

  // エントリーポイント
  entry: {
    'myapp/static/myapp/js/main': path.resolve(
      __dirname,
      'myapp/static/myapp/js/index.ts'
    )//,
    //'[application_b]/static/[application_b]/js/main': path.resolve(
    //  __dirname,
    //  '[application_b]/static/[application_b]/js/index.ts'
    //)
  },

  // ファイル出力先
  output: {
    // 出力先ディレクトリ
    path: __dirname,
    // 出力ファイル名
    filename: '[name].bundle.js',
  },

  // ソースマップ
  devtool: 'cheap-module-eval-source-map',

  // ローダー
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                includePaths: ['./node_modules'],
              },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  // モジュール解決
  resolve: {
    extensions: ['.ts', '.js'],
  },

  // プラグイン
  plugins: [
    new MiniCssExtractPlugin({
      moduleFilename: ({ name }) =>
        `${name.replace('/js/', '/css/')}.bundle.css`,
    }),
  ],
};