import { useDep2, helperDep2 } from '~/dep-2'
vi.mock(import('~/dep-2'), () => ({
  useDep2: () => 'factory-2',
  helperDep2: () => 200,
}))
test('manual mock 2', () => {
  expect(useDep2()).toBe('factory-2')
})
