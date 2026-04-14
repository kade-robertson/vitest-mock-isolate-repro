import { useDep0, helperDep0 } from '~/dep-0'
vi.mock(import('~/dep-0'), () => ({
  useDep0: () => 'factory-0',
  helperDep0: () => 0,
}))
test('manual mock 0', () => {
  expect(useDep0()).toBe('factory-0')
})
