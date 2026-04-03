import fs from 'fs'

export default async function globalTeardown() {
    for (const dir of ['.next-test-3000', '.next-test-3001']) {
        fs.rmSync(dir, { recursive: true, force: true })
    }
}
