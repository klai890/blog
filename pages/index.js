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
          {/* Description */}
          Writing mostly about tech and ethics.
        </p>
      </section>

      {/* tags & list of blog posts */}
      <PostList allPostsData={allPostsData} tags={allTags}/>

    </Layout>
  )
}