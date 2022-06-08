// standard layout with profile at top and link to home at btm!

import styles from './layout.module.css';
import Head from 'next/head';
import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

export const name = 'Goose\'s Blog';
export const siteTitle = 'blog';

export default function Layout({children, home}){
    return (
        <div className={styles.container}>
            {/* meta content */}
            <Head>
                <meta name='description' content='blog' />
                <meta name='og:title' content={siteTitle} />
            </Head>

            {/* top profile pic! */}
            <header className={styles.header}>
                {/* terneary statement! */}
                { home ? 
                // if home page render larger profile image
                (
                    <>
                        <Image 
                            priority // considered high priority, preloaded
                            src="/images/profile.png"
                            className={utilStyles.borderCircle}
                            height={144}
                            width={144}
                            alt={name}
                        />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) 
                :
                (
                    // if not home page, render smaller image (link to home)
                    <>
                        <Link href='/'>
                            <a>
                                <Image
                                    priority
                                    src="/images/profile.png"
                                    className={utilStyles.borderCircle}
                                    height={108}
                                    width={108}
                                    alt={name}
                                />
                            </a>
                        </Link>

                        <h2 className={utilStyles.headingLg}>
                            <Link href="/">
                                <a className={utilStyles.colorInherit}>{name}</a>
                            </Link>
                        </h2>
                    </>
                )}
            </header>

            {/* load children */}
            <div>{children}</div>

            {/* if not home page, link back to home page */}
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}

            
        </div>
    )
}