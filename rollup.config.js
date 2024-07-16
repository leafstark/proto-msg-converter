import ts from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'

const configs = []
const input = 'index.ts'

configs.push({
    input,
    output: [
      {
        file: 'lib/index.cjs.js',
        name: 'ProtoMsgConverter',
        format: 'cjs'
      },
      {
        file: 'lib/index.esm.js',
        format: 'es'
      }
    ],
    plugins: [
      ts({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false
          }
        }
      })
    ]
  })
  
  configs.push({
    input,
    output: {
      file: `lib/index.d.ts`,
      format: 'es'
    },
    plugins: [dts()],
  })
  
  export default configs