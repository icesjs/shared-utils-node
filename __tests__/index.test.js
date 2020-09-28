//
test('test export all modules', () => {
  const { getProcessArgs } = require('../lib')
  expect(getProcessArgs).toBe(require('../lib/getProcessArgs').getProcessArgs)
})
