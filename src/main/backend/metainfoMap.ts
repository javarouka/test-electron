import { load } from 'cheerio';
import { NewsPlaform } from '../../domain/news';

const pickElement = (html: string, selector: string) => {
    if (!html) return "Empty HTML!!!!"
    const $ = load(html);
    return $(selector).first().text()
}

// type types = keyof typeof NewsPlaform

// https://www.chosun.com/ .top_news h2 .center_tit
// http://www.donga.com/ .headline1 .head_title .title
// https://www.mk.co.kr/news/ $(".headline_box h2").first().text()
// http://www.khan.co.kr/ // .topNews .hd_title
// http://isplus.joins.com/ $("#top_headline")
// http://m.ohmynews.com/ $(".ot-wrap .link_tit strong").text()
const MetaInfoMap: Record<string, CrawlerMetaInfo> = {
    [NewsPlaform.CHOSUN]: {
        url: 'https://www.chosun.com/',
        selector: (html: string) => {
            return pickElement(html, '.top_news .center_tit')
        }
    },
    [NewsPlaform.MK]: {
        url: 'https://www.mk.co.kr/news/',
        selector: (html: string) => {
            return pickElement(html, '.headline_box h2:first-child')
        }
    },
    [NewsPlaform.OHM]: {
        url: 'http://m.ohmynews.com/',
        selector: (html: string) => {
            return pickElement(html, '.link_tit strong')
        }
    },
    [NewsPlaform.KAHN]: {
        url: 'http://www.khan.co.kr/',
        selector: (html: string) => {
            return pickElement(html, '.topNews .hd_title')
        }
    },
    [NewsPlaform.IS]: {
        url: 'http://isplus.joins.com/',
        selector: (html: string) => {
            return pickElement(html, '#top_headline')
        }
    },
    [NewsPlaform.DONGA]: {
        url: 'http://www.donga.com/',
        selector: (html: string) => {
            return pickElement(html, '.mNewsLi_t1 .title')
        }
    }
}

export default MetaInfoMap