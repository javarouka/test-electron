import * as fs from 'fs'
import { app } from 'electron'

const homeDir = app.getPath('home');
const reportPath = `${homeDir}/report`

export default class NewsExporter {
    async exportFile(content: Record<string, NewsHeadLine | undefined>): Promise<string> {
        return new Promise((resolve, reject) => {
            if(!fs.existsSync(reportPath)) {
                fs.mkdirSync(reportPath)
            }
            const filePath = `${reportPath}/exported.${new Date().toString()}.json`
            fs.writeFileSync(filePath, JSON.stringify(content))
            resolve(filePath)
        })
    }
}