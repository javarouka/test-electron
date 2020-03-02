import * as electrom from 'electron';
import * as icov from 'iconv-lite';
import MetaInfoMap from '../metainfoMap';
import { NewsPlaform } from '../../../domain/news';

export default class NewsCrawler {

    async crawl(type: string): Promise<NewsHeadLine> {
        console.log(`> crawling ${type} start.`)
        const meta = MetaInfoMap[type]
        return new Promise((resolve, reject) => {
            const request = electrom.net.request({
                method: "get",
                url: meta.url
            })
            request.on("response", response => {
                this.handleResponse(response, type, resolve, meta);
            })
            request.end();
        })
    }

    private handleResponse(response: electrom.IncomingMessage, type: string, resolve: (value?: NewsHeadLine | PromiseLike<NewsHeadLine> | undefined) => void, meta: CrawlerMetaInfo) {
        let body = '';
        response.on('error', (error: Error) => {
            console.error(`> crawling ERROR: ${JSON.stringify(error)}`);
        });
        response.on("data", (chunk: Buffer) => {
            body = this.accumateBody(type, body, chunk);
        });
        response.on('end', function () {
            console.log(`> crawling ${type} ok. size > ${body.length}`);
            resolve({
                title: meta.selector(body).trim()
            });
        });
    }

    private accumateBody(type: string, body: string, chunk: Buffer) {
        if (type === NewsPlaform.KAHN || type === NewsPlaform.MK) {
            body += icov.decode(chunk, 'euc-kr');
        }
        else {
            body += chunk.toString();
        }
        return body;
    }
}