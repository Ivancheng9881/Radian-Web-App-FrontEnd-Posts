import { Layout } from 'antd'
import { FC } from 'react'
import Navbar from '../Navbar'

interface PropsType {
  fullWidth?: boolean
}

const DefaultLayout : FC<PropsType> = (props) => {

  const styles = {
    marginTop: 80, 
    display: props.fullWidth ? 'block' : 'flex'
  }

  return (
      <Layout>
        <Navbar />
        <div style={styles}>
          {props.children}          
        </div>
      </Layout>
  )
}

export default DefaultLayout
