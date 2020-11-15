const { spawn } = require('child_process');
const basePath = process.cwd();

(function run() {
  const commandOptions = {
    cwd: basePath,
    stdio: 'inherit',
  };

  spawn('webpack', ['serve', '--config', './build/config/webpack.editor-client.dev.js'], commandOptions);
  spawn(
    'tsc',
    ['--watch', '--preserveWatchOutput', '--project', './build/config/tsconfig.editor-server.json'],
    commandOptions
  );
  spawn('nodemon', ['--watch', './dist/editor/server', './dist/editor/server/index.js'], commandOptions);
})();
