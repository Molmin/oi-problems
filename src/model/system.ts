import { ensureDirSync } from 'fs-extra'
import { Problem } from './problem'

const problems: Problem[] = []

export class System {
    static init() {
        ensureDirSync('tmp')
        ensureDirSync('db')
    }

    static addProblem(problem: Problem) { }
}
