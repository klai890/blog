// Dynamic routing and page creation for each post

// imports
import { getPostData, getPostIds } from '../../utils/posts';
import Layout from '../../components/layout';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import Date from '../../components/date';

export async function getStaticProps({params}){
    const postData = await getPostData(params.id);
    return {
        // getStaticProps() must return an object with property props!
        props:{
            postData,
        }
    };
}

export async function getStaticPaths(){
    const paths = await getPostIds();

    return {
        paths,
        fallback: false,
    };
}

export default function Post({ postData }){
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>

            <h1 className={utilStyles.headingXl}>{postData.title}</h1>

            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>

            {/* basically inject HTML into this div; kinda dangerous exposes to cross-site scripting attacks */}
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />

        </Layout>
    )
}