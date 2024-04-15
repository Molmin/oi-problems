import superagent from 'superagent'

async function main() {
    const response = await superagent.get('https://cdn.luogu.com.cn/problemset-open/latest.ndjson.gz')
}

main()
