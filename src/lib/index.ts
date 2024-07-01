export * from './download'
export * from './sample'

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
