import superagent, { SuperAgentRequest } from 'superagent'
import { JSDOM } from 'jsdom'
import { downloadFile } from '../lib'

const UA = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'AppleWebKit/537.36 (KHTML, like Gecko)',
    'Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.76',
].join(' ')

export class Fetcher {
    public agent = superagent.agent()
    constructor(
        public endpoint: string = '',
    ) { }

    url(url: string) {
        return this.endpoint ? new URL(url, this.endpoint).toString() : url
    }

    get(url: string) {
        return this.agent.get(this.url(url))
            .set('User-Agent', UA).retry(60)
    }
    post(url: string) {
        return this.agent.get(this.url(url))
            .set('User-Agent', UA)
    }
    html(response: superagent.Response) {
        return new JSDOM(response.text).window.document
    }
    async download(url: string) {
        return await downloadFile(this.url(url))
    }
}
