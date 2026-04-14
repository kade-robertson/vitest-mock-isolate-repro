import { useDep9, helperDep9 } from '~/dep-9'
vi.mock(import('~/dep-9'))
test('automock 19: should be mock fn', () => {
  expect(vi.isMockFunction(useDep9)).toBe(true)
})
test('automock 19: mockReturnValue works', () => {
  vi.mocked(useDep9).mockReturnValue('mocked-19')
  expect(useDep9()).toBe('mocked-19')
})
