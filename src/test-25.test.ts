import { useDep5, helperDep5 } from '~/dep-5'
vi.mock(import('~/dep-5'))
test('automock 25: should be mock fn', () => {
  expect(vi.isMockFunction(useDep5)).toBe(true)
})
test('automock 25: mockReturnValue works', () => {
  vi.mocked(useDep5).mockReturnValue('mocked-25')
  expect(useDep5()).toBe('mocked-25')
})
