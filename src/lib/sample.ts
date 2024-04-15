export function formatSample(sample: string) {
    return sample.split('\n').map((line) => line.replace(/\s+$/, '')).join('\n').replace(/\n*$/, '\n')
}
