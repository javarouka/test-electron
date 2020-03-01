// declare enum NewsPlaform {
//     CHOSUN,
//     MK,
//     OHM,
//     KAHN,
//     IS,
//     DONGA
// }

type Selector = (html: string) => string
type CrawlerMetaInfo = {
    url: string
    selector: Selector
}

interface BackendInterface {
    exportText(content: Record<string, NewsHeadLine | undefined>): Promise<void>
    crawlingNewsHeadline(type: string): Promise<NewsHeadLine>
}

interface NewsHeadLine {
    title: string
    
}

type Nullable<T> = T | null;

declare interface Window {
    backend: BackendInterface;
}
