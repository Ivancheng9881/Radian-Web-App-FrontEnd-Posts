import type { NextComponentType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../navbar/navbar.components'
import styles from '../styles/Home.module.css'

const Layout: NextComponentType = (props) => {
  return (
    <div
      className='bg-theme-bg-dark min-h-screen'
    >
        <Navbar />
        {props.children}
    </div>
  )
}

export default Layout
