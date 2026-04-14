import { useDep3, helperDep3 } from '~/dep-3'
vi.mock(import('~/dep-3'))
test('automock 13: should be mock fn', () => {
  expect(vi.isMockFunction(useDep3)).toBe(true)
})
test('automock 13: mockReturnValue works', () => {
  vi.mocked(useDep3).mockReturnValue('mocked-13')
  expect(useDep3()).toBe('mocked-13')
})
