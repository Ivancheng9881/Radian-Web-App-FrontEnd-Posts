import { Layout } from 'antd'
import Navbar from '../Navbar'

const DefaultLayout = (props) => {
  return (
    <div
      className='bg-theme-bg-dark min-h-screen w-full'
    >
      <Layout>
        <Navbar />
        <Layout.Content>
          {props.children}          
        </Layout.Content>
      </Layout>
    </div>
  )
}

export default DefaultLayout
