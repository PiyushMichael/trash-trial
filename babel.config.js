module.exports = {
  plugins: [
    [
      'module-resolver', {
        root: ['./src'],
        extensions: ['.js', '.ios.js', '.android.js'],
      },
    ],
  ],
  presets: ['module:metro-react-native-babel-preset'],
};
