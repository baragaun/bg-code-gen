import commandLineArgs from 'command-line-args'
import { BgCodeGenConfig } from './types.js'

const optionDefinitions = [
  { name: 'config-path', alias: 'c', type: String },
]

const bgCodeGen = (config: BgCodeGenConfig) => {
  console.log('Baragaun Code Generator started.')
  const options = commandLineArgs(optionDefinitions)
  console.log('options=', options)
}

export default bgCodeGen
