import { expect } from 'chai'
import codeGen from '../index.js'
import config from '../projects/quark/config.js'

describe('Quark', () => {
  it('runs the code generator for Quark', async () => {
    const result = await codeGen(config)
    expect(result).to.equal(0)
  })
})
