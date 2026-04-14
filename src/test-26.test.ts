import { useDep6, helperDep6 } from '~/dep-6'
vi.mock(import('~/dep-6'))
test('automock 26: should be mock fn', () => {
  expect(vi.isMockFunction(useDep6)).toBe(true)
})
test('automock 26: mockReturnValue works', () => {
  vi.mocked(useDep6).mockReturnValue('mocked-26')
  expect(useDep6()).toBe('mocked-26')
})
