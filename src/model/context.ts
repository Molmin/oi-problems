import { ensureDirSync } from 'fs-extra'
import { Problem } from './problem'
import { Fetcher } from './fetch'

const problems: Problem[] = []

export class Context {
    fetcher: Fetcher = new Fetcher()

    init() {
        ensureDirSync('tmp')
        ensureDirSync('db')
    }

    async addProblem(problem: Problem) { }
}
