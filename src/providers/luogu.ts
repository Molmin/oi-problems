import fs from 'node:fs'
import { downloadFile, formatSample, solveMultiLimits } from '../lib'
import { unzip } from '../lib/zip'
import { Context } from '../model/context'
import { Problem } from '../model/problem'

export async function run(ctx: Context) {
    console.info('Downloading problem set from luogu')
    await downloadFile('https://cdn.luogu.com.cn/problemset-open/latest.ndjson.gz', 'tmp/luogu.gz')
    console.info('Extracting files')
    await unzip('tmp/luogu.gz', 'tmp/luogu.ndjson')
    const problems = fs.readFileSync('tmp/luogu.ndjson').toString()
        .split('\n').filter((line) => line.trim())
    for (let i = 0; i < problems.length; i++) {
        const {
            pid, title, difficulty, fullScore,
            background, description, inputFormat, outputFormat, translation, samples, hint,
            limits, tags,
        } = JSON.parse(problems[i])
        console.info(`Solving problem #${i + 1}`)
        let content = ''
        if (background?.trim()) content += `## 题目背景\n\n${background}\n\n`
        if (description?.trim()) content += `## 题目描述\n\n${description}\n\n`
        if (inputFormat?.trim()) content += `## 输入格式\n\n${inputFormat}\n\n`
        if (outputFormat?.trim()) content += `## 输出格式\n\n${outputFormat}\n\n`
        if (translation?.trim()) content += `## 题目翻译\n\n${translation}\n\n`
        for (let sampleId = 0; sampleId < samples?.length || 0; sampleId++) {
            content += `\`\`\`input${sampleId + 1}\n${formatSample(samples[sampleId][0] || '')}\n\`\`\`\n\n`
            content += `\`\`\`output${sampleId + 1}\n${formatSample(samples[sampleId][1] || '')}\n\`\`\`\n\n`
        }
        if (hint?.trim()) content += `## 提示\n\n${hint}\n\n`
        const result = new Problem(
            `luogu/${pid}`, title, { 'statement.md': content.trim() },
            { time: solveMultiLimits(limits.time), memory: solveMultiLimits(limits.memory, 1024), full_score: fullScore },
            tags, difficulty,
        )
        await ctx.addProblem(result)
    }
}
