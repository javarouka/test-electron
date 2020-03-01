import * as React from 'react';
import { Block, Text } from '../base';
import PlatformTitle from './PlatformTitle';
import styled from 'styled-components';

type Props = {
    platform: string
    title?: string
    loading?: boolean
}

const Wrapper = styled(Block)`
    margin: 4px 0;
    border: solid 1px #ccc;
    padding: 4px;
`
const TitleContent = styled(Text)`
    font-size: 13px;
    color: #333;
`

const HeadLineUnit = (props: Props) => {

    return (
        <Wrapper>
            <PlatformTitle>{props.platform}</PlatformTitle>
            <TitleContent>{props?.title ?? ""}</TitleContent>
        </Wrapper>
    );
};

export default HeadLineUnit;
