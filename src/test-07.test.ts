import { useDep7, helperDep7 } from '~/dep-7'
vi.mock(import('~/dep-7'), () => ({
  useDep7: () => 'factory-7',
  helperDep7: () => 700,
}))
test('manual mock 7', () => {
  expect(useDep7()).toBe('factory-7')
})
