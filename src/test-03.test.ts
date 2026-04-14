import { useDep3, helperDep3 } from '~/dep-3'
vi.mock(import('~/dep-3'), () => ({
  useDep3: () => 'factory-3',
  helperDep3: () => 300,
}))
test('manual mock 3', () => {
  expect(useDep3()).toBe('factory-3')
})
