import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import simplevars from 'postcss-simple-vars'
import nested from 'postcss-nested'
import postcss from 'rollup-plugin-postcss'
import postcssPresetEnv from 'postcss-preset-env'
import { eslint } from 'rollup-plugin-eslint'
import reactSvg from 'rollup-plugin-react-svg'
import pkg from './package.json'

export default {
  input: 'src/index.tsx', // our source file
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
    // {
    //   file: pkg.module,
    //   format: 'umd',
    //   name: 'reactVerificationCodeVirtualKeyboard',
    // },
  ],
  external: ['antd-mobile', 'react', 'prop-types', 'classnames', 'count-down-ts', 'lodash'],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    resolve(), // 这样 Rollup 能找到 `ms`
    commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
    babel({
      exclude: 'node_modules/**', // 防止打包node_modules下的文件
      runtimeHelpers: true, // 使plugin-transform-runtime生效
    }),
    // eslint({
    //   throwOnError: true,
    //   throwOnWarning: true,
    //   include: ['src/**'],
    //   exclude: ['node_modules/**'],
    // }),
    postcss({
      modules: true,
      plugins: [
        simplevars(),
        nested(),
        // cssnext({ warnForDuplicates: false, }),
        postcssPresetEnv(),
      ],
      // 处理.css和.less文件
      extensions: ['.css', 'less'],
    }),
    reactSvg({
      // svgo options
      svgo: {
        plugins: [], // passed to svgo
        multipass: true,
      },

      // whether to output jsx
      jsx: false,

      // include: string
      include: null,

      // exclude: string
      exclude: null,
    }),
  ],
}
