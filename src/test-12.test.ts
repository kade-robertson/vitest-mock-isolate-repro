import { useDep2, helperDep2 } from '~/dep-2'
vi.mock(import('~/dep-2'))
test('automock 12: should be mock fn', () => {
  expect(vi.isMockFunction(useDep2)).toBe(true)
})
test('automock 12: mockReturnValue works', () => {
  vi.mocked(useDep2).mockReturnValue('mocked-12')
  expect(useDep2()).toBe('mocked-12')
})
