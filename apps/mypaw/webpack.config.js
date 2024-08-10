const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');

// Nx composable plugins for webpack.
module.exports = composePlugins(
  withNx(),
  withReact(),
  (config, { options, context }) => {
    // Update the webpack configuration as needed here.
    // e.g. config.plugins.push(new MyPlugin())
    return config;
  }
);
