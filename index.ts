import { Context } from './src/model/context'
import * as Luogu from './src/providers/luogu'
import * as QOJ from './src/providers/qoj'

async function main() {
    const ctx = new Context()
    await QOJ.run(ctx)
}

main()
