import fs from 'node:fs'
import { createGunzip } from 'zlib'

export async function unzip(from: string, to: string) {
    const readStream = fs.createReadStream(from)
    const writeStream = fs.createWriteStream(to)
    readStream.pipe(createGunzip()).pipe(writeStream)
    return new Promise((resolve, reject) => {
        readStream.on('error', reject)
        writeStream.on('error', reject)
        writeStream.on('finish', resolve)
    })
}
