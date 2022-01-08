import cleanup from 'rollup-plugin-cleanup';

export default {
  input: 'src/index.js',
  output: {
    file: 'npm/o.development.es.js',
    format: 'es'
  },
  plugins: [
    cleanup({
      comments: 'none'
    })
  ],
}
