import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../src/components/layout/layout.components'
import HomeRoot from '../src/pageComponents/home/index.homeComponent'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Radian</title>
      </Head>
      <main>
        <HomeRoot />
      </main>
    </Layout>
  )
}

export default Home
