const multipleEntry = require('react-app-rewire-multiple-entry')([
  {
    entry: 'src/index.tsx',
    template: 'public/index.html',
    outPath: '/panel.html',
  },
  {
    entry: 'src/pages/config/index.tsx',
    template: 'public/index.html',
    outPath: '/config.html',
  },
  {
    entry: 'src/index.tsx',
    template: 'public/index.html',
    outPath: '/video_overlay.html',
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
