import { expect } from 'chai'
import codeGen from '../codeGen.js'
import config from '../configs/mm-backend-core.js'

describe('bgCodeGen', () => {
  it('runs the code generator for MicroMentor', async () => {
    const result = await codeGen(config)
    expect(result).to.equal(0)
  })
})
