import { expect } from 'chai'
import codeGen from '../index.js'
import config from '../projects/secureId/config.js'

describe('SecureId', () => {
  it('runs the code generator for SecureId', async () => {
    const result = await codeGen(config)
    expect(result).to.equal(0)
  })
})
