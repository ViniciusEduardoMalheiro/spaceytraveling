import { GetStaticProps } from 'next';
import { FiCalendar, FiUser } from 'react-icons/fi'
import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';
import Link from 'next/link';
import Header from '../components/Header';
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

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

  const [posts, setPosts] = useState();

  return (
    <>
    <main className={commonStyles.container}>
      <Header />

      <div>
        <Link href='/'>
          <a className={styles.post}>
            <strong>Spacey, a missão para o futuro</strong>
            <p>O futuro mais proximo</p>
            <ul>
              <li>
                <FiCalendar />
                18 maio 2022
              </li>
              <li>
                <FiUser />
                Vinicius Malheiro
              </li>
            </ul>
          </a>
        </Link>
      </div>
      <button className={styles.loadButton}>Carregar mais posts</button>
    </main>
    </>
  )
 }

 export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();
    const postsResponse = await prismic.query([Prismic.Predicates.at('document.type', 'posts'),

  ],
  {
    pageSize: 1,
    }
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
      title: post.data.title,
      substitle: post.data.subtitle,
      author: post.data.author,
      },
    };
  });

  const postsPagination = {
    nextPage: postsResponse.next_page,
    results: posts,
  }


  return {
    props: {
      postsPagination,
    },
  };
 };
   