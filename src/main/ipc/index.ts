import { ipcMain, IpcMainEvent } from 'electron'
import NewsCrawler from '../backend/NewsCrawler'
import * as fs from 'fs'

export const enableIPC = () => {
    ipcMain.on('crawl:request', (event: IpcMainEvent, type: string) => {
        new NewsCrawler().crawl(type).then(data => {
            event.reply('crawl:response', data)
            // event.returnValue = data
        }).catch(error => {
            event.reply('crawl:response', error)
        })
    })
    ipcMain.on('export:request', (event: IpcMainEvent, content: Record<string, NewsHeadLine | undefined>) => {
        const filePath = `exported.${new Date().toString()}.json`
        fs.writeFileSync(filePath, JSON.stringify(content))
        event.reply('export:response', filePath)
    })
};
