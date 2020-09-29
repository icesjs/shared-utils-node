//
test('test export all modules', () => {
  const { parseProcessArgs } = require('../lib/index')
  expect(parseProcessArgs).toBe(require('../lib/argv').parseProcessArgs)
})
