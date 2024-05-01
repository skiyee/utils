import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
  ],
  clean: true,
  declaration: true,
  externals: ['vue-demi'],
  rollup: {
    emitCJS: true,
    esbuild: {
      minify: true,
    },
  },
})
