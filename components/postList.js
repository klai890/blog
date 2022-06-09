// postList component– renders the list of blog posts
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Date from './date';
import styles from './postList.module.css';
import {filterTags} from '../utils/tags';
import {useState} from 'react';

export default function PostList({tags, allPostsData}){

    // updating posts render list using tags!

    const [posts, setPosts] = useState( allPostsData );

    // filters all the posts
    function handleClick(tag){
        var filteredPosts = filterTags(tag, allPostsData);
        setPosts(filteredPosts);
    }

    function resetPosts(){
        setPosts(allPostsData);
    }

    function randNum(){
        return Math.random();
    }

    return (
        <>
            {/* list of tags */}
            <div>
                <h2 className={utilStyles.headingLg}>Tags</h2>

                 <div className={`${utilStyles.lightText} ${styles.container}`}>
                        <button key={randNum()} className={styles.tag} onClick={() => resetPosts()}>
                            All Posts
                        </button>

                    {tags.map( tag => (
                        // need a key when using for-loop to generate items
                        <button key={randNum()} className={styles.tag} onClick={() => handleClick(tag)}>
                            {tag}
                        </button>
                    ))}
                </div>
        </div>

            {/* heading */}
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
            </section>

            {/* list */}
            <ul className={utilStyles.list}>
            {posts == null ? null : posts.map( ({id, date, title}) => (
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
      </>

    )
}