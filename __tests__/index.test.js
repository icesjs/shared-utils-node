//
test('test export all modules', () => {
  const { parseProcessArgs } = require('../index')
  expect(parseProcessArgs).toBe(require('../lib/argv').parseProcessArgs)
})
