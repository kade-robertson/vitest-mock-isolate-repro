#!/usr/bin/env node

/**
 * Runs vitest repeatedly and reports pass/fail statistics.
 *
 * Usage:  node scripts/test-repeated.mjs [--bin <path>] [runs]
 *   --bin   Path to the vitest binary (default: "pnpm vitest")
 *   runs    Number of iterations (default: 10)
 *
 * Exit code 0 when ALL runs pass, 1 when ANY run fails.
 */

import { execSync } from 'node:child_process'

const args = process.argv.slice(2)
let bin = 'pnpm vitest'
let runs = 10

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--bin' && args[i + 1]) {
    bin = `node ${args[++i]}`
  } else if (/^\d+$/.test(args[i])) {
    runs = Number(args[i])
  }
}

const version = execSync(`${bin} --version`, { encoding: 'utf-8' }).trim()
console.log(`\nvitest ${version}  (${runs} runs)\n`)

const cwd = process.cwd()
let failures = 0
const failedFiles = new Map()
const errorMessages = new Map()

function stripCwd(filepath) {
  return filepath.startsWith(cwd) ? filepath.slice(cwd.length + 1) : filepath
}

function firstLine(msg) {
  return msg.split('\n')[0]
}

for (let i = 1; i <= runs; i++) {
  try {
    execSync(`${bin} run --reporter=json`, { stdio: 'pipe', encoding: 'utf-8' })
    process.stdout.write(`  run ${i}/${runs}: pass\n`)
  } catch (err) {
    failures++
    const stdout = err.stdout ?? ''

    let report
    try {
      report = JSON.parse(stdout)
    } catch {
      process.stdout.write(`  run ${i}/${runs}: FAIL  (vitest exited non-zero but produced no JSON)\n`)
      const snippet = (stdout + (err.stderr ?? '')).trim().slice(0, 300)
      if (snippet) process.stdout.write(`      ${snippet}\n`)
      continue
    }

    const failedSuites = report.testResults.filter((t) => t.status === 'failed')
    const files = failedSuites.map((s) => stripCwd(s.name))

    for (const f of files) {
      failedFiles.set(f, (failedFiles.get(f) || 0) + 1)
    }

    const testErrors = failedSuites.flatMap((suite) =>
      suite.assertionResults
        .filter((a) => a.status === 'failed')
        .map((a) => {
          const msg = firstLine(a.failureMessages[0] ?? 'unknown error')
          errorMessages.set(msg, (errorMessages.get(msg) || 0) + 1)
          return { test: a.fullName, error: msg }
        })
    )

    process.stdout.write(`  run ${i}/${runs}: FAIL  ${files.join(', ')}\n`)
    for (const { test, error } of testErrors) {
      process.stdout.write(`      ${test}\n        ${error}\n`)
    }
  }
}

console.log(`\n  result: ${failures}/${runs} runs failed`)
if (failedFiles.size > 0) {
  console.log('\n  files that failed:')
  for (const [file, count] of [...failedFiles].sort((a, b) => b[1] - a[1])) {
    console.log(`    ${file} (${count}x)`)
  }
}
if (errorMessages.size > 0) {
  console.log('\n  error messages seen:')
  for (const [msg, count] of [...errorMessages].sort((a, b) => b[1] - a[1])) {
    console.log(`    [${count}x] ${msg}`)
  }
}

process.exit(failures > 0 ? 1 : 0)
