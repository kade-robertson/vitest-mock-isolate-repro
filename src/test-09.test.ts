import { useDep9, helperDep9 } from '~/dep-9'
vi.mock(import('~/dep-9'), () => ({
  useDep9: () => 'factory-9',
  helperDep9: () => 900,
}))
test('manual mock 9', () => {
  expect(useDep9()).toBe('factory-9')
})
