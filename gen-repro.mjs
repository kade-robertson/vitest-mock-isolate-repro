import fs from 'node:fs'

for (let i = 0; i < 10; i++) {
  fs.writeFileSync(`src/dep-${i}.ts`, [
    `export function useDep${i}(): string { return 'real-${i}' }`,
    `export function helperDep${i}(): number { return ${i} }`,
    '',
  ].join('\n'))
}

for (let t = 0; t < 30; t++) {
  const depIdx = t % 10
  const useManual = t < 10
  const lines = []
  lines.push(`import { useDep${depIdx}, helperDep${depIdx} } from '~/dep-${depIdx}'`)
  lines.push('')
  if (useManual) {
    lines.push(`vi.mock(import('~/dep-${depIdx}'), () => ({`)
    lines.push(`  useDep${depIdx}: () => 'factory-${t}',`)
    lines.push(`  helperDep${depIdx}: () => ${t * 100},`)
    lines.push(`}))`)
    lines.push('')
    lines.push(`test('manual mock ${t}', () => {`)
    lines.push(`  expect(useDep${depIdx}()).toBe('factory-${t}')`)
    lines.push(`})`)
  } else {
    lines.push(`vi.mock(import('~/dep-${depIdx}'))`)
    lines.push('')
    lines.push(`test('automock ${t}: should be mock fn', () => {`)
    lines.push(`  expect(vi.isMockFunction(useDep${depIdx})).toBe(true)`)
    lines.push(`})`)
    lines.push(`test('automock ${t}: mockReturnValue works', () => {`)
    lines.push(`  vi.mocked(useDep${depIdx}).mockReturnValue('mocked-${t}')`)
    lines.push(`  expect(useDep${depIdx}()).toBe('mocked-${t}')`)
    lines.push(`})`)
  }
  lines.push('')
  fs.writeFileSync(`src/test-${String(t).padStart(2, '0')}.test.ts`, lines.join('\n'))
}
console.log('Generated 10 deps + 30 test files')
