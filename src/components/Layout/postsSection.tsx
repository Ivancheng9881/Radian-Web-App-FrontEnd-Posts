import { Layout } from 'antd'
import { FC } from 'react'
import { useHistory } from 'react-router'
import { mainRoute } from '../../commons/route'
import ConnectWalletPopup from '../ConnectWalletPopup'
import Navbar from './Navbar'

interface PropsType {
  fullWidth?: boolean
}

const DefaultLayout : FC<PropsType> = (props) => {
  
  const history = useHistory<History>();

  const styles = {
    body: {
      marginTop: history.location.pathname === mainRoute ? 90 : 0, 
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
