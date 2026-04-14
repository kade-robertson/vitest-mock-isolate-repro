import { useDep5, helperDep5 } from '~/dep-5'
vi.mock(import('~/dep-5'), () => ({
  useDep5: () => 'factory-5',
  helperDep5: () => 500,
}))
test('manual mock 5', () => {
  expect(useDep5()).toBe('factory-5')
})
