import { ipcRenderer, IpcRendererEvent } from 'electron';

const backendInterface: BackendInterface = {
    exportText: (content: Record<string, NewsHeadLine | undefined>): Promise<void> => {
        return new Promise((resolve, reject) => {
            ipcRenderer.once('export:response', (event: IpcRendererEvent, path: string) => {
                console.log(`saved file ${path}`)
                resolve()
            });
            ipcRenderer.send('export:request');
        })
    },
    crawlingNewsHeadline: (type: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            ipcRenderer.once('crawl:response', (event: IpcRendererEvent, args: string) => {
                console.log('response', type, args)
                resolve(args)
            });
            ipcRenderer.send('crawl:request', type);
        })
    }
};

export default backendInterface;
