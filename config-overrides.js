const { basename, dirname } = require('path')

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
    // Inject the multiple entry plugin
    multipleEntry.addMultiEntry(config)

    // Find the rule for typescript and add the @alveusgg packages ot it
    const findRule = (condition, rules) => {
      for (const rule of rules) {
        if (condition(rule)) return rule
        if (rule.oneOf) {
          const found = findRule(condition, rule.oneOf)
          if (found) return found
        }
      }
    }
    const loader = findRule(
      rule => rule.test && rule.include && /\\\.(?:\((?:.+\|)?ts(?:\|.+)?\)|ts)\$/.test(rule.test.toString()),
      config.module.rules,
    )
    if (!loader) throw new Error('Could not find loader rule for typescript')
    loader.include = [
      ...(Array.isArray(loader.include) ? loader.include : [loader.include]),
      /node_modules\/@alveusgg/,
    ]

    // Minify ambassador images
    config.module.rules.push({
      test: /\.(png|jpe?g)$/,
      include: /node_modules\/@alveusgg\/data\/assets\/ambassadors/,
      type: 'asset',
      generator: {
        filename: pathData => {
          const dir = basename(dirname(pathData.filename))
          return `static/media/ambassadors/${dir}/[name].[contenthash][ext]`
        },
      },
      use: [
        {
          loader: "webpack-image-resize-loader",
          options: {
            width: 550,
          },
        },
      ],
    })

    // Disable minification
    config.optimization = {
      minimize: false,
    }

    return config
  }
}
