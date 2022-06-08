// tags
import utilStyles from '../styles/utils.module.css';
import styles from './tags.module.css';
import Link from 'next/link'

export default function Tags({tags}){

    return (
        <div>
        <h2 className={utilStyles.headingLg}>Tags</h2>

            <div className={`${utilStyles.lightText} ${styles.container}`}>
                {tags.map( tag => (

                // need a key when using for-loop to generate items
                <div className={styles.tag} key={tag}>
                    <Link href="/"> 
                        {tag}
                    </Link>
                </div>
                ))}
            </div>
        </div>
    )
}