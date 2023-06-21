module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.ts',
          '.android.ts',
          '.js',
          '.ts',
          '.jsx',
          '.tsx',
          '.json',
        ],
        alias: {
          '@': './src',
          root: './',
          assets: ['./assets'],
          screens: ['./src/screens'],
          common: ['./src/common'],
          features: ['./src/features'],
          routes: ['./src/routes'],
          api: ['./src/api'],
        },
      },
    ],
  ],
};
