import { ipcMain, IpcMainEvent } from 'electron'
import NewsCrawler from '../backend/modules/NewsCrawler'
import NewsExporter from '../backend/modules/NewsExporter';

// event.returnValue = data
export const enableIPC = () => {
    ipcMain.on('crawl:request', (event: IpcMainEvent, type: string) => {
        new NewsCrawler().crawl(type).then(data => {
            event.reply('crawl:response', data)
        }).catch(error => {
            event.reply('crawl:response', error)
        })
    })
    ipcMain.on('export:request', (event: IpcMainEvent, content: Record<string, NewsHeadLine | undefined>) => {
        new NewsExporter().exportFile(content).then((filePath: String) => {
            event.reply('export:response', filePath)
        })
    })
};
