import superagent from 'superagent'
import fs from 'node:fs'

export async function downloadFile(
    request: superagent.Request | string, target?: string,
): Promise<any> {
    if (typeof request === 'string') {
        request = superagent.get(request)
    }
    const path = target || `tmp/${Math.random().toString().split('.')[1]}`
    const stream = fs.createWriteStream(path)
    request.pipe(stream)
    const promise = new Promise((resolve, reject) => {
        stream.on('finish', resolve)
        stream.on('error', reject)
        request.on('error', reject)
        request.on('timeout', reject)
    })
    if (target) return promise
    else {
        await promise
        const data = fs.readFileSync(path)
        fs.unlinkSync(path)
        return data
    }
}
