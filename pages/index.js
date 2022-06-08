import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import {getSortedPostData} from '../utils/posts';
import {extractTags} from '../utils/tags';
import PostList from '../components/postList';

// static props for Home
export async function getStaticProps(){
  const allPostsData = await getSortedPostData();

  return {
    props: {
      allPostsData,
    },
  };
}


export default function Home({allPostsData}) {

  // array of all tags
  var allTags = extractTags(allPostsData);
  
  return (
    <Layout home>
      
      <section className={utilStyles.headingMd}>
        <p>
          Hi! I will be using this blog to write about web development and artificial intelligence. It will
          be mostly notes on things I'm learning and doing.
        </p>
      </section>

      {/* tags & list of blog posts */}
      <PostList allPostsData={allPostsData} tags={allTags}/>

    </Layout>
  )
}