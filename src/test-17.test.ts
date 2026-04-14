import { useDep7, helperDep7 } from '~/dep-7'
vi.mock(import('~/dep-7'))
test('automock 17: should be mock fn', () => {
  expect(vi.isMockFunction(useDep7)).toBe(true)
})
test('automock 17: mockReturnValue works', () => {
  vi.mocked(useDep7).mockReturnValue('mocked-17')
  expect(useDep7()).toBe('mocked-17')
})
