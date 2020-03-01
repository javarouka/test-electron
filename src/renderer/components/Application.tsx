import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import Layout from './layout/Layout';
import { Title } from './base';
import NewsHeadLines from './headline/NewsHeadLines';

const Application = () => {
    return (
        <Layout>
            <Title>📰 실시간 뉴스</Title>
            <NewsHeadLines />
        </Layout>
    );
};

export default hot(Application);
