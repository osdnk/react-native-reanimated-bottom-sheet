module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            'reanimated-bottom-sheet': '../src/index',
          },
        },
      ],
    ],
  }
}
