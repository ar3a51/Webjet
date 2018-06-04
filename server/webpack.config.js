const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: ['webpack/hot/poll?1000', './src/server.ts'],
  watch: false,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: "production",
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    splitChunks: {
        cacheGroups: {
            vendors: {
                name: 'vendors',
                chunks: 'all',
                reuseExistingChunk: true,
                priority: 1,
                enforce: true,
                test(module, chunks) {
                    const name = module.nameForCondition && module.nameForCondition();
                    return chunks.some(chunk => {
                        return chunk.name === 'main' && /[\\/]node_modules[\\/]/.test(name);
                    });
                }
            },
        }
    }
},
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
};
