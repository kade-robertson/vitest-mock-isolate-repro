import { useDep1, helperDep1 } from '~/dep-1'
vi.mock(import('~/dep-1'))
test('automock 11: should be mock fn', () => {
  expect(vi.isMockFunction(useDep1)).toBe(true)
})
test('automock 11: mockReturnValue works', () => {
  vi.mocked(useDep1).mockReturnValue('mocked-11')
  expect(useDep1()).toBe('mocked-11')
})
