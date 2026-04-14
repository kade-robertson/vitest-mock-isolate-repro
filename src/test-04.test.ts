import { useDep4, helperDep4 } from '~/dep-4'
vi.mock(import('~/dep-4'), () => ({
  useDep4: () => 'factory-4',
  helperDep4: () => 400,
}))
test('manual mock 4', () => {
  expect(useDep4()).toBe('factory-4')
})
