import { readFileSync } from 'node:fs'
import PdfParse from 'pdf-parse'

export * from './download'
export * from './sample'

export type File = Buffer | string

export function solveMultiLimits(
    limits: number[], rate = 1,
): number | [number, number] {
    const min = Math.min(...limits)
    const max = Math.max(...limits)
    if (min === max) return min * rate
    else return [min * rate, max * rate]
}

export function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

export async function readPDF(file: File): Promise<string> {
    const original = typeof file === 'string' ? readFileSync(file) : file
    return (await PdfParse(original)).text
}
