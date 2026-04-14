import { useDep2, helperDep2 } from '~/dep-2'
vi.mock(import('~/dep-2'))
test('automock 22: should be mock fn', () => {
  expect(vi.isMockFunction(useDep2)).toBe(true)
})
test('automock 22: mockReturnValue works', () => {
  vi.mocked(useDep2).mockReturnValue('mocked-22')
  expect(useDep2()).toBe('mocked-22')
})
