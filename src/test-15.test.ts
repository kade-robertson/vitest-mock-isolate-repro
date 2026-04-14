import { useDep5, helperDep5 } from '~/dep-5'
vi.mock(import('~/dep-5'))
test('automock 15: should be mock fn', () => {
  expect(vi.isMockFunction(useDep5)).toBe(true)
})
test('automock 15: mockReturnValue works', () => {
  vi.mocked(useDep5).mockReturnValue('mocked-15')
  expect(useDep5()).toBe('mocked-15')
})
