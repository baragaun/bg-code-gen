import codeGen from '../../index.js'
import config from './config/index.js'

((): void => {
  codeGen(config).then(() => {}, (error) => {
    console.error(error)
  })
})()
