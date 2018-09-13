const expect = require('chai').expect

const { PositronContext } = require('./index')

describe('ptlib suite', () => {
  it('new peek should return 0', () => {
    const ctx = new PositronContext()
    expect(ctx.peek()).equals(0)
  })

  it('incr once should return 1', () => {
    const ctx = new PositronContext()
    expect(ctx.incr()).equals(1)
  })

  it('incr twice should return 2', () => {
    const ctx = new PositronContext()
    ctx.incr()
    expect(ctx.incr()).equals(2)
  })
})
