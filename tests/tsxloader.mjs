import { readFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import ts from 'typescript'

export async function load(url, context, nextLoad) {
  if (!url.includes('node_modules') && (url.endsWith('.tsx') || url.endsWith('.ts'))) {
    const filePath = fileURLToPath(url)
    const source = readFileSync(filePath, 'utf8')
    const out = ts.transpileModule(source, {
      compilerOptions: {
        jsx: ts.JsxEmit.ReactJSX,
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
      },
      fileName: filePath,
    })
    return { format: 'module', shortCircuit: true, source: out.outputText }
  }
  return nextLoad(url, context)
}

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/')) {
    const base = pathToFileURL(process.cwd() + '/' + specifier.slice(2)).href
    for (const cand of [base, base + '.tsx', base + '.ts', base + '/index.tsx']) {
      try { return await nextResolve(cand, context) } catch {}
    }
  }
  try {
    return await nextResolve(specifier, context)
  } catch (err) {
    if (specifier.startsWith('next/')) return await nextResolve(specifier + '.js', context)
    throw err
  }
}
