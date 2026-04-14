import { useDep6, helperDep6 } from '~/dep-6'
vi.mock(import('~/dep-6'), () => ({
  useDep6: () => 'factory-6',
  helperDep6: () => 600,
}))
test('manual mock 6', () => {
  expect(useDep6()).toBe('factory-6')
})
