import { useDep0, helperDep0 } from '~/dep-0'
vi.mock(import('~/dep-0'))
test('automock 10: should be mock fn', () => {
  expect(vi.isMockFunction(useDep0)).toBe(true)
})
test('automock 10: mockReturnValue works', () => {
  vi.mocked(useDep0).mockReturnValue('mocked-10')
  expect(useDep0()).toBe('mocked-10')
})
