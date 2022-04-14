import { Layout } from 'antd'
import { FC } from 'react'
import FloatingChatButton from '../Button/FloatingChatButton.components'
import ConnectWalletPopup from '../ConnectWalletPopup'
import Navbar from './Navbar'

interface PropsType {
  fullWidth?: boolean
}

const DefaultLayout : FC<PropsType> = (props) => {

  const styles = {
    body: {
      // margin: 'auto',
      marginTop: 80, 
      display: props.fullWidth ? 'block' : 'flex'
    },
    bodyFullWidth: {},
  }

  return (
      <Layout>
        <Navbar />
        <div style={props.fullWidth ? styles.bodyFullWidth : styles.body}>
          {props.children}          
        </div>
        {/* <FloatingChatButton /> */}
        <ConnectWalletPopup />
      </Layout>
  )
}

export default DefaultLayout
