const portInUse        = require('./dev/utils').portInUse;
const ports            = require('./dev/utils').ports;

const webpack          = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config           = require('./webpack.dev.config');

let index = 0;

let port = ports[index];

let lastPort = port;



function selectAnotherPort(index) {
  port  =  ports[index + 1];
  index =  index + 1;
  checkPort();
  lastPort = port;
}

function checkPort() {
  portInUse(port, returnValue => {
    returnValue ? execWebpack(index) : execWebpack();
  });
}

function execWebpack () {
  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      hash: false,
      version: true,
      timings: true,
      assets: true,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: false
    }
  }).listen(port, 'localhost', function (err, result) {
    if (err) {
      return console.log(err);
    }

    console.log(`Listening at http://localhost:${port}/`);
  });
}


checkPort();
