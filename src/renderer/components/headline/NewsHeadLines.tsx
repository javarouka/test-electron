import * as React from 'react';
import { Card, SubTitle, Block, Button } from '../base';
import { NewsPlaform } from '../../../domain/news';
import styled from 'styled-components';
import HeadLineUnit from './HeadLineUnit'
import NotificationMessage from '../base/NotificationMessage'

const Wrapper = styled(Block)`
    ${SubTitle} {
        display: flex;
        align-items: center;
        justify-content: space-between;
        ${Button} {
            
        }
    }
    ${SubTitle} {
        color: white;
        background-color: #191775;
        padding: 8px 16px;
    }
    ${Card} {
        margin: 0;
        padding: 0;
    }
`

const NewsHeadLines = () => {

    const [chosun, setChosun] = React.useState<NewsHeadLine>()
    const [donga, setDonga] = React.useState<NewsHeadLine>()
    const [is, setIS] = React.useState<NewsHeadLine>()
    const [khan, setKhan] = React.useState<NewsHeadLine>()
    const [ohm, setOhm] = React.useState<NewsHeadLine>()
    const [mk, setMK] = React.useState<NewsHeadLine>()
    const [saveCount, setSaved] = React.useState<number>(0)

    const exportFile = () => {
        window.backend.exportText({
            chosun,
            donga,
            is,
            khan,
            ohm,
            mk,
        }).then(() => {
            setSaved(saveCount + 1)
        })
    }

    React.useEffect(() => {
        (async function anyNameFunction() {

            // Oooooooops.
            // const [
            //     _chosun,
            //     _donga,
            //     _is,
            // ] = await Promise.all([
            //     window.backend.crawlingNewsHeadline(NewsPlaform.CHOSUN),
            //     window.backend.crawlingNewsHeadline(NewsPlaform.DONGA),
            //     window.backend.crawlingNewsHeadline(NewsPlaform.IS)
            // ])
            // setChosun(_chosun)
            // setDonga(_donga)
            // setIS(_is)

            const _chosun = await window.backend.crawlingNewsHeadline(NewsPlaform.CHOSUN)
            setChosun(_chosun)
            const _donga = await window.backend.crawlingNewsHeadline(NewsPlaform.DONGA)
            setDonga(_donga)
            const _is = await window.backend.crawlingNewsHeadline(NewsPlaform.IS)
            setIS(_is)
            const _khan = await window.backend.crawlingNewsHeadline(NewsPlaform.KAHN)
            setKhan(_khan)
            const _ohm = await window.backend.crawlingNewsHeadline(NewsPlaform.OHM)
            setOhm(_ohm)
            const _mk = await window.backend.crawlingNewsHeadline(NewsPlaform.MK)
            setMK(_mk)

        })();
    }, []);

    return (
        <Wrapper>
            <NotificationMessage show={saveCount} message={"저장되었습니다"} />
            <SubTitle>
                각 신문 헤드라인
                <Button onClick={exportFile}>내보내기</Button>
            </SubTitle>
            <Card>
                <HeadLineUnit platform={'조선일보'} title={chosun?.title} />
                <HeadLineUnit platform={'동아일보'} title={donga?.title} />
                <HeadLineUnit platform={'일간스포츠'} title={is?.title} />
                <HeadLineUnit platform={'경향신문'} title={khan?.title} />
                <HeadLineUnit platform={'오마이뉴스'} title={ohm?.title} />
                <HeadLineUnit platform={'매일경제'} title={mk?.title} />
            </Card>
        </Wrapper>
    );
};

export default NewsHeadLines;
