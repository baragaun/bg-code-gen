import { expect } from 'chai'
import codeGen from '../index.js'
import config from '../projects/micromentor/config.js'

describe('MicroMentor', () => {
  it('runs the code generator for MicroMentor', async () => {
    const result = await codeGen(config)
    expect(result).to.equal(0)
  })
})
