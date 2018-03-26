module.exports = {
  entry: ['babel-polyfill', './src/ts/tetris.ts'],
  resolve:
    {
      extensions: ['.ts', '.js', '.json']
    }
}
