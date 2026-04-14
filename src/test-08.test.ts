import { useDep8, helperDep8 } from '~/dep-8'
vi.mock(import('~/dep-8'), () => ({
  useDep8: () => 'factory-8',
  helperDep8: () => 800,
}))
test('manual mock 8', () => {
  expect(useDep8()).toBe('factory-8')
})
