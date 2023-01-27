import codeGen from '../index.js'
import config from './config.js'

((): void => {
  codeGen(config).then(() => {}, (error) => {
    console.error(error)
  })
})()
