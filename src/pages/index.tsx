import { GetStaticProps } from 'next';
import { FiCalendar, FiUser } from 'react-icons/fi'
import { getPrismicClient } from '../services/prismic';
import * as prismic from '@prismicio/client';
import Link from 'next/link';
import Header from '../components/Header';
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
} 

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

 export default function Home({ postsPagination }: HomeProps) {
    return (
      <>   
      <main className={commonStyles.container}>
      <Header />

        <div className={styles.posts}>
          <Link href="/">
            <a className={styles.post}>
              <strong>Como utilizar Hooks</strong>
              <p>Pensando em sincronização em vez de ciclos de vida</p>
              <ul>
                <li>
                  <FiCalendar className={styles.calender}/>
                  5 Maio de 2022
                </li>
                <li>
                  <FiUser />
                  Vinicius Malheiro
                </li>
                </ul>
            </a>
          </Link>
        </div>
        <div className={styles.posts}>
          <Link href="/">
            <a className={styles.post}>
              <strong>Criando um app CRA do zero</strong>
              <p>Pensando em sincronização em vez de ciclos de vida</p>
              <ul>
                <li>
                  <FiCalendar />
                  5 Maio de 2022
                </li>
                <li>
                  <FiUser />
                  Vinicius Malheiro
                </li>
                </ul>
            </a>
          </Link>
        </div>

        <div className={styles.divButton}>
            <button className={styles.loadButton}>Carregar mais posts</button>
        </div>

      </main>
      </>
    )
 }

 export async function getServerSideProps() {
  const prismic = getPrismicClient()

  const postsResponse = await prismic.getByType("post", {
    pageSize: 100,
  });

  
const posts = postsResponse.results.map(post => {
  return {
    uid: post.uid,
    first_publication_date: post.first_publication_date,
    date: {
      title: post.data.title,
      subtitle: post.data.subtitle,
      author: post.data.author,
    },
  }
})

const postsPagination = {
  nextPage: postsResponse.next_page,
  results: posts,
}

  return {
    props: {
      postsPagination
    },
  };
}
