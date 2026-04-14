import { useDep8, helperDep8 } from '~/dep-8'
vi.mock(import('~/dep-8'))
test('automock 18: should be mock fn', () => {
  expect(vi.isMockFunction(useDep8)).toBe(true)
})
test('automock 18: mockReturnValue works', () => {
  vi.mocked(useDep8).mockReturnValue('mocked-18')
  expect(useDep8()).toBe('mocked-18')
})
