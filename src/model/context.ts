import { ensureDirSync, writeFileSync } from 'fs-extra'
import { Problem } from './problem'
import { Fetcher } from './fetch'
import path from 'node:path'

const problems: Problem[] = []

export class Context {
    fetcher: Fetcher = new Fetcher()

    init() {
        ensureDirSync('tmp')
        ensureDirSync('db')
    }

    async addProblem(problem: Problem) {
        ensureDirSync(path.join('data', problem.origin))
        for (const file in problem.files) {
            writeFileSync(path.join('data', problem.origin, file), problem.files[file])
        }
    }
}
