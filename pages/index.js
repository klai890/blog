import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import {getSortedPostData} from '../utils/posts';
import Link from 'next/link';
import Date from '../components/date';
import Tags from '../components/tags';

// static props for Home
export async function getStaticProps(){
  const allPostsData = getSortedPostData();

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({allPostsData}) {

  // array of objects; ex: [{id: 1, tags:['hello', 'world']}]
  var allTags = [];
  allPostsData.forEach(postData =>{
    var tags = postData.tags;

    tags.forEach( tag => {
      allTags.push(tag);
    })

  })

  return (
    <Layout home>
      
      <section className={utilStyles.headingMd}>
        <p>
          Hi! I will be using this blog to write about web development and artificial intelligence. It will
          be mostly notes on things I'm learning and doing.
        </p>
      </section>

      {/* list of tags */}
      <Tags tags={allTags} />
      
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
      </section>


      {/* list of blog posts */}
      <ul className={utilStyles.list}>
        {allPostsData.map( ({id, date, title}) => (

          // need a key when using for-loop to generate items
          <li className={utilStyles.listItem} key={id}>

            {/* link to post */}
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>

            {/* date of post */}
            <div className={utilStyles.lightText}>
              <Date dateString={date} />
            </div>

          </li>
        ))}
      </ul>

    </Layout>
  )
}
