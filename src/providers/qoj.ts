import fs from 'node:fs'
import { downloadFile, formatSample, sleep, solveMultiLimits } from '../lib'
import { unzip } from '../lib/zip'
import { Context } from '../model/context'
import { File, Problem } from '../model/problem'
import { Fetcher } from '../model/fetch'

export async function run(ctx: Context) {
    ctx.fetcher = new Fetcher('https://qoj.ac')
    let pids: number[] = []
    for (let page = 1, lastPage = 1; page - lastPage <= 5; page++) {
        console.info(`Fetching page ${page}`)
        const list = ctx.fetcher.html(await ctx.fetcher.get('/problems').query({ page }))
        const elements = list.querySelectorAll('.table-responsive > table > tbody > tr')
        const next_pids: number[] = []
        for (const ele of elements) {
            next_pids.push(+(ele.querySelector('td')?.innerHTML || '').replace(/^#/, ''))
        }
        if (next_pids.length > 0) lastPage = page, pids = pids.concat(next_pids)
        break
    }
    for (const pid of pids) {
        await sleep(50)
        const document = ctx.fetcher.html(await ctx.fetcher.get(`/problem/${pid}`))
        const tabs = document.querySelectorAll('div.tab-content > .tab-pane')
        const files: Record<string, File> = {}
        for (const tab of tabs) {
            if (!(tab.getAttribute('id') || '').startsWith('tab-statement')) continue
            if (!(tab.innerHTML || '').trim()) continue
            const id = (tab.getAttribute('id') || '').replace(/^tab-statement/, '')
            files[`statement${id}.html`] = tab.innerHTML || ''
            const iframes = tab.querySelectorAll('iframe')
            for (const iframe of iframes) {
                const src = iframe.getAttribute('src')
                if (!src) continue
                if (!src.startsWith('/download.php?type=statement&id=')) throw new Error('Unknown statement file path.')
                const id = new URL(src, 'https://qoj.ac').searchParams.get('ver')
                files[`statement${id ? `-${id}` : ''}.pdf`] = await ctx.fetcher.download(src)
            }
        }
        const title = (document.querySelector('.page-header.text-center')?.textContent || '').split(' ').slice(2).join(' ')
        console.info(pid, files, title)
        const problem = new Problem(`qoj/${pid}`, title, files, { time: 0, memory: 0 }, [])
        // const statementFile = await ctx.fetcher.get('/download.php').query({ type: 'statement', id: pid })
        // console.info(content.innerHTML)
        // break
    }
}
