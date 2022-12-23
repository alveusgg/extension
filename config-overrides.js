const multipleEntry = require('react-app-rewire-multiple-entry')([
  {
    entry: 'src/index.tsx',
    template: 'public/index.html',
    outPath: 'panel.html',
  },
  {
    entry: 'src/index.tsx',
    template: 'public/index.html',
    outPath: 'mobile.html',
  },
  {
    entry: 'src/pages/overlay/index.tsx',
    template: 'public/index.html',
    outPath: 'video_overlay.html',
  }
]);

module.exports = {
  webpack: function(config, env) {
    multipleEntry.addMultiEntry(config)
    config.optimization = {
      minimize: false,
    }
    return config
  }
}
