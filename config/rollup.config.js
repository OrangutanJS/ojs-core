import cleanup from 'rollup-plugin-cleanup';

export default {
  input: 'src/index.js',
  output: {
    file: 'npm/o.development.js',
    format: 'cjs'
  },
  plugins: [
    cleanup({
      comments: 'none'
    })
  ]
}