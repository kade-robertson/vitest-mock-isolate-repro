import { useDep4, helperDep4 } from '~/dep-4'
vi.mock(import('~/dep-4'))
test('automock 14: should be mock fn', () => {
  expect(vi.isMockFunction(useDep4)).toBe(true)
})
test('automock 14: mockReturnValue works', () => {
  vi.mocked(useDep4).mockReturnValue('mocked-14')
  expect(useDep4()).toBe('mocked-14')
})
