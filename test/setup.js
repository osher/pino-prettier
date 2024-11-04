global.Should = require('should')
global.Should.Assertion.add('arity', function arity(n) {
  this.params = { operator: `to have arity of ${n}` }

  this.obj.should.be.a.Function()
  this.obj.should.have.property('length', n)
})
