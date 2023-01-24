import { expect } from 'chai'
import codeGen from '../index.js'
import config from '../projects/channels/config.js'

describe('Channels', () => {
  it('runs the code generator for Channels', async () => {
    const result = await codeGen(config)
    expect(result).to.equal(0)
  })
})
