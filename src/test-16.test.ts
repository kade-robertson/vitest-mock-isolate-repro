import { useDep6, helperDep6 } from '~/dep-6'
vi.mock(import('~/dep-6'))
test('automock 16: should be mock fn', () => {
  expect(vi.isMockFunction(useDep6)).toBe(true)
})
test('automock 16: mockReturnValue works', () => {
  vi.mocked(useDep6).mockReturnValue('mocked-16')
  expect(useDep6()).toBe('mocked-16')
})
