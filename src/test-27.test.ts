import { useDep7, helperDep7 } from '~/dep-7'
vi.mock(import('~/dep-7'))
test('automock 27: should be mock fn', () => {
  expect(vi.isMockFunction(useDep7)).toBe(true)
})
test('automock 27: mockReturnValue works', () => {
  vi.mocked(useDep7).mockReturnValue('mocked-27')
  expect(useDep7()).toBe('mocked-27')
})
