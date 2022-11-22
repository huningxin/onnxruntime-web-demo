module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-import')(),
          require('postcss-cssnext')({ browsers: ['>0.5%'] })]
      }
    }
  },
  parallel: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/onnxruntime-web-demo/' : '/',
  outputDir: 'docs',
  configureWebpack: () => {
    let configs = {
      module: {
        rules: [
          {
            test: /\.worker\.ts$/,
            use: {
              loader: "worker-loader",
              options: {
                inline: "no-fallback",
              }
            }
          },
          {
          
            test: /\.worker\.ts$/,
            use: [
              {
                loader: 'ts-loader'
              }
            ],
            exclude: /node_modules/
          }
        ]
      },  
      resolve: {
        extensions: [".ts", ".js"],
      },
    };
    if (process.env.NODE_ENV === 'production') {
      configs.node = {
        __dirname: false,
        __filename: false
      }
    }
    return configs
  },
  devServer: {
    headers: {
      "Cross-Origin-Embedder-Policy": 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin'
    }
  },
}

