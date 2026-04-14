import { useDep1, helperDep1 } from '~/dep-1'
vi.mock(import('~/dep-1'), () => ({
  useDep1: () => 'factory-1',
  helperDep1: () => 100,
}))
test('manual mock 1', () => {
  expect(useDep1()).toBe('factory-1')
})
