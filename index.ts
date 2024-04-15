import superagent from 'superagent'
import { downloadFile } from './src/lib'
import fs from 'node:fs'
import { ensureDirSync } from 'fs-extra'
import { createGunzip } from 'zlib'

ensureDirSync('tmp')

function unzip(from: string, to: string) {
    // ensureDirSync(to)
    const readStream = fs.createReadStream(from)
    const writeStream = fs.createWriteStream(to)
    readStream.pipe(createGunzip()).pipe(writeStream)
    return new Promise((resolve, reject) => {
        readStream.on('error', reject)
        writeStream.on('error', reject)
        writeStream.on('finish', resolve)
    })
}

async function main() {
    console.info('Downloading problem set from luogu')
    await downloadFile('https://cdn.luogu.com.cn/problemset-open/latest.ndjson.gz', 'tmp/luogu.gz')
    console.info('Extracting files')
    await unzip('tmp/luogu.gz', 'tmp/luogu')
    console.info('done')
}

main()
