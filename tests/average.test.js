const { average } = require('../utils/for_testing')

describe('average', () => {
  test('of one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })

  test('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})

test('toContain', () => {
  expect([1, 2, 3, 4]).toContain(1)
  expect([1, 2, 3, 4, { a: 1 }]).not.toContain({ a: 1 })
  expect([1, 2, 3, 4, { a: 1 }]).toContainEqual({ a: 1 })
  expect(['5f09b5598254d3282bf4b3b7', '5f09d3d267e003292e3b4453', '5f09d47e57ebe7298861b2cc', '5f09d4b4aa306b29a29c86c6', '5f09d4d93ba0a429d24ffeff']).toContainEqual('5f09d4d93ba0a429d24ffeff')
})
