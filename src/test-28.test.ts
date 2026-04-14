import { useDep8, helperDep8 } from '~/dep-8'
vi.mock(import('~/dep-8'))
test('automock 28: should be mock fn', () => {
  expect(vi.isMockFunction(useDep8)).toBe(true)
})
test('automock 28: mockReturnValue works', () => {
  vi.mocked(useDep8).mockReturnValue('mocked-28')
  expect(useDep8()).toBe('mocked-28')
})
